<?php
$q=$_GET["q"];

$con = mysql_connect('localhost', 'peter', 'abc123');
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("ajax_demo", $con);

$sql="SELECT * FROM locations WHERE customerid = '".$q."'";

$result = mysql_query($sql);

echo "<table>";

while($row = mysql_fetch_array($result))
  {
  echo "<tr><td><b>CustomerID</b></td><td>".$row['CustomerID']."</td></tr>";
  echo "<tr><td><b>CompanyName</b></td><td>".$row['CompanyName']."</td></tr>";
  echo "<tr><td><b>ContactName</b></td><td>".$row['ContactName']."</td></tr>";
  echo "<tr><td><b>Address</b></td><td>".$row['Address']."</td></tr>";
  echo "<tr><td><b>City</b></td><td>".$row['City']."</td></tr>";
  echo "<tr><td><b>PostalCode</b></td><td>".$row['PostalCode']."</td></tr>";
  echo "<tr><td><b>Country</b></td><td>".$row['Country']."</td></tr>";
  }

echo "</table>";

mysql_close($con);
?>
