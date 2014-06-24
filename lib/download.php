<?php
    # we are a PNG image
    header('Content-type: text/xml');
     
    # we are an attachment (eg download), and we have a name
    header('Content-Disposition: attachment; filename="Beers.xml"');
     
    $xml = simplexml_load_string( trim($_POST['xmlstr']) );

    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = true;
    $dom->formatOutput = true;
    $dom->loadXML($xml->asXML());
    
    echo $dom->saveXML();
?>