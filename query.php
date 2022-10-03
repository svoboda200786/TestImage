<?php 
	$img = imagecreatefromstring(file_get_contents("img1.jpg"));
	ob_start();
	imagepng($img);
	$png = ob_get_clean();
	$src = base64_encode($png);

function imgAPI($data)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, 'http://127.0.0.1:3000');
    //curl_setopt($curl, CURLOPT_URL, 'http://135.181.145.36:3000');    
    //curl_setopt($curl, CURLOPT_URL, 'http://95.214.8.107:3000');
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($curl);
    echo "<h1>" . $response . "<h1/>";
    return json_decode($response);
    curl_close($curl);
}

$data = array(
          'image' => $src
        );

imgAPI(json_encode($data));
?>
