<!DOCTYPE html>
<html>
<head>
<title>Vehicle API - @OsintUchihaProBot</title>
<style>
body { background:#000; color:#00eaff; text-align:center; font-family:Arial; padding-top:80px; }
input,button { padding:10px; margin:10px; border-radius:5px; border:none; }
button { background:#00eaff; color:#000; font-weight:bold; }
pre { text-align:left; margin:auto; width:350px; color:#0ff; }
</style>
</head>
<body>

<h1>🚗 Vehicle Lookup API</h1>
<p>Powered by <b>@OsintUchihaProBot</b></p>

<input id="rc" placeholder="Enter RC Number">
<button onclick="fetchData()">Search</button>

<pre id="output"></pre>

<script>
async function fetchData(){
    const rc=document.getElementById("rc").value;
    const res=await fetch(`/api/vehicle?rc=${rc}`);
    document.getElementById("output").textContent=
      JSON.stringify(await res.json(), null, 2);
}
</script>

</body>
</html>
