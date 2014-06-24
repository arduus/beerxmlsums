<?php
    $str = "<RECIPES>";

    $ret = new stdclass();
    $ret->errors = array();
    $ret->errorFiles = array();
    $ret->recipeCount = 0;

    $l = sizeof($_FILES['files']['tmp_name']);
    for($i = 0; $i < $l; $i++){
        $temp = $_FILES['files']['tmp_name'][$i];
        $tstr = trim(file_get_contents($temp));
        $filexml = @simplexml_load_string($tstr);

        if( $filexml ){
            $nodes = $filexml->xpath('//RECIPE');

            if(sizeof($nodes)){
                foreach($nodes as $recipe){
                    $ret->recipeCount++;
                    $str .= $recipe->asXML();
                }
            } else {
                $ret->errors[] = $_FILES['files']['name'][$i] . ' contains no recipes (will be ignored)';
                $ret->errorFiles[] = $_FILES['files']['name'][$i];    
            }
        } else {
            $ret->errors[] = $_FILES['files']['name'][$i] . ' is not a valid XML file (will be ignored)';
            $ret->errorFiles[] = $_FILES['files']['name'][$i];
        }
        
    }

    if($ret->recipeCount == 0){
        $ret->errors[] = "There are no valid recipes in any of the files";
    }

    $str .= "</RECIPES>";

    $xml = simplexml_load_string($str);

    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = false;
    $dom->loadXML($xml->asXML());

    $ret->response = $dom->saveXML();
    
    echo json_encode($ret);
?>