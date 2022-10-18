import logging
import boto3

from botocore.exceptions import ClientError
from boto3.s3.transfer import TransferConfig

s3_client = boto3.client('s3')
# Set the desired multipart threshold value (15MB)
MB = 1024 ** 2
config = TransferConfig(multipart_threshold=15*MB, max_concurrency=4)
BUCKET_NAME = "tcc-unip-images"
bucket_base_url = f"https://{BUCKET_NAME}.s3.sa-east-1.amazonaws.com/"


def save_image(file_obj, object_name):

    # Handles file name
    object_name += "." + file_obj.filename.split(".", 1)[1]
    # Upload the file
    try:
        obj_bytes = file_obj.file._file
        s3_client.upload_fileobj(obj_bytes, BUCKET_NAME, object_name, ExtraArgs={'ContentType': file_obj.content_type})
        image_url = bucket_base_url + object_name
        print(f'Image {image_url} uploaded successfully')
        return image_url
    except ClientError as e:
        logging.error(e)
        return None

