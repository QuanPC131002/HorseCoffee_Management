import { Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const ImageUpload = ({ onUploadSuccess }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'doikbjukg',
        uploadPreset: 'Image1',
      },
      (error: any, result: any) => {
        if (result && result.event === 'success') {
          setImageUrl(result.info.secure_url);
          onUploadSuccess(result.info.secure_url); 
          message.success('Tải ảnh lên thành công!');
        }
      }
    ).open();
  };

  return (
    <div>
      <Button icon={<UploadOutlined />} onClick={handleUpload}>
        Tải ảnh lên
      </Button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ marginTop: '10px', maxWidth: '100px' }} />}
    </div>
  );
};

export default ImageUpload;
