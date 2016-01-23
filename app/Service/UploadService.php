<?php

namespace Cv\Service;

class UploadService {

    public function validate($file) {

        $messages = [];

        if($file->getClientSize() > 1000000) {
            $messages[] = $file->getClientOriginalName()." too big";
        }

        return [
            "success" => count($messages) === 0,
            "messages" => $messages
        ];
    }

    public function saveImage($file) {

        $destination_path = '/shared/'.date('y').'/'.date('m').'/'.date('d').'/';
        $filename = $this->generateRandomString() . "." . $file->getClientOriginalExtension();

        $file->move(public_path().$destination_path, $filename);

        // $mimeType = $file->getClientMimeType();

        // get source image url 
        // $source_url = public_path() . $destination_path . $filename;

            

        return [
            "destination_path" => $destination_path,
            "filename" => $filename
        ];
    }


    public function resizeAndSaveImage($mimeType , $source_url, $destination_url) {
        // initial image buffer
        if ($mimeType == 'image/jpeg') $image = imagecreatefromjpeg($source_url); 
        elseif ($mimeType == 'image/gif') $image = imagecreatefromgif($source_url); 
        elseif ($mimeType == 'image/png') $image = imagecreatefrompng($source_url);

        // calc new image size keep aspect ratio
        $original_width = imagesx($image);
        $original_height = imagesy($image);

        // if current image is bigger then 500px, resize it to make it smaller
        $new_width = 500;
        if($original_width > $new_width) {
            // calc new height by keep aspect ratio
            $new_height = $this->getResizeHeightByWidth($original_height, $original_width, $new_width);

            // resize with image buffer
            $new_image = imagecreatetruecolor($new_width, $new_height);
            imagecopyresampled($new_image, $image, 0, 0, 0, 0, $new_width, $new_height, $original_width, $original_height);

            // saving image as full-alpha
            imagealphablending($new_image, false);
            imagesavealpha($new_image, true);

            if ($mimeType == 'image/jpeg') imagejpeg($new_image, $source_url); 
            elseif ($mimeType == 'image/gif') imagegif($new_image, $source_url); 
            elseif ($mimeType == 'image/png') imagepng($new_image, $source_url);

            imagedestroy($new_image);
        }

        imagedestroy($image);   
    }

    /**
     * Get the resized height from the width keeping the aspect ratio
     *
     * @param  int $width - Max image width
     *
     * @return Height keeping aspect ratio
     */
    private function getResizeHeightByWidth($original_height,$original_width,$width)
    {
        return floor(($original_height / $original_width) * $width);
    }

    private function generateRandomString() {
        $length = 10;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $characters_length = strlen($characters);
        $random_string = '';
        for ($i = 0; $i < $length; $i++) {
            $random_string .= $characters[rand(0, $characters_length - 1)];
        }
        return $random_string;
    }
}