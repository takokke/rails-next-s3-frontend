import { NextPage } from "next";
import React, { useRef, useState } from "react";
import axios from "axios";

const Upload = () => {
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
            } catch (error) {
              console.error(error);
              setMessage('Failed to upload image');
            }
        }
    }

    return (
        <div>
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
        </div>
    )
}

export default Upload