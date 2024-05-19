import Image from 'next/image';
import React from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';

type ImageType = {
  id: number
  thumbnail_url: string;
}

const UploadImage:NextPage<ImageType> = (props) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return (
    <div>
      sss
    </div>
  );
};

export default UploadImage