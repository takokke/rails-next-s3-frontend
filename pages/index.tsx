import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import Link from "next/link";
import Image from "next/image";

type ImageType = {
  id: number
  thumbnail_url: string;
}


const Index: NextPage = () => {
  // 投稿一覧を取得するためのurl
  const url = process.env.NEXT_PUBLIC_BACKEND_API + "/images"
  const [images, setImages] = useState<ImageType[]>([])

  const fetchImages = async () => {
    try {
      const res = await axios.get(url)
      setImages(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // 隠されたinput要素にアクセスするためのref
  const inputImageRef = useRef<HTMLInputElement | null>(null)
  // 選択されたファイルデータを保持するref
  const fileRef = useRef<File | null>(null)
  const [message, setMessage] = useState<string | null>('')

  // 「画像をアップロード」が押されたとき、inputがクリックされる
  const onClickText = () => {
      if (inputImageRef.current !== null) {
          inputImageRef.current.click()
      }
  }
  // 画像が選択されたとき、fileRefにファイル情報をセットする
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files !== null && files.length > 0) {
          fileRef.current = files[0]
      }
  }
  // 非同期通信
  const onClickUpload = async () => {
      if (fileRef.current !== null) {
          // fileをアップロードするときは、FormDateのインスタンスと、'Content-Type': 'multipart/form-data'がいるらしい
          const formData = new FormData();
          formData.append('image[thumbnail]', fileRef.current);

          try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/images`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            setMessage('Image uploaded successfully');
            // ファイルデータを保持する変数をリセット
            fileRef.current = null
            // フォームを空にする
            inputImageRef.current = null
            // 再度取得
            fetchImages()
          } catch (error) {
            console.error(error);
            setMessage('Failed to upload image');
          }
      }
  }
  return (
      <>
        <p style={{ textDecoration: 'underline'}} onClick={onClickText}>
            画像をアップロード
        </p>
        <input
            ref={inputImageRef}
            type="file"
            accept="image/*"
            onChange={onChangeImage}
            style={{ visibility: 'hidden'}} 
        />
        <br />
        <button onClick={onClickUpload}>アップロードする</button>
        {message && <p>{message}</p>}
        <div>
          {images.map((image, index) => (
            <div key={index}>
              <Link href={`${process.env.NEXT_PUBLIC_FRONTEND}/images/${image.id}`}>
                <Image
                  src={`${image.thumbnail_url}`}
                  alt="アップロード画像"
                  width={300}
                  height={300}
                />
              </Link>
            </div>
          ))}
        </div>
      </>
  )
}

export default Index