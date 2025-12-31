export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { rc } = req.query;

  if (!rc) {
    return res.status(400).json({
      error: true,
      message: "RC number required: /api/vehicle?rc=MH04KA0151",
      source_by: "@OsintUchihaProBot"
    });
  }

  try {
    const apiKey = "demo123";
    const url =
      `https://vehicle-api-isuzu3-8895-nexusxnikhils-projects.vercel.app/api/vehicle?apikey=${apiKey}&vehical=${rc}`;

    const response = await fetch(url);
    const raw = await response.json();

    // 🧹 CLEANING LOGIC: DELETE ANY credit/cached key anywhere

    function deepClean(obj) {
      if (typeof obj !== "object" || obj === null) return obj;

      for (const key in obj) {
        if (key.toLowerCase() === "credit") delete obj[key];
        if (key.toLowerCase() === "cached") delete obj[key];
        else obj[key] = deepClean(obj[key]); // recursive clean
      }
      return obj;
    }

    const cleanedData = deepClean(raw);

    // FINAL OUTPUT FORMAT
    const cleaned = {
      error: false,
      rc: rc.toUpperCase(),
      result: cleanedData.result || cleanedData.data || cleanedData,
      source_by: "@OsintUchihaProBot"
    };

    return res.status(200).json(cleaned);

  } catch (e) {
    return res.status(500).json({
      error: true,
      message: "Server error",
      details: e.message,
      source_by: "@OsintUchihaProBot"
    });
  }
}
