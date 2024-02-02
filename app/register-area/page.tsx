'use client';

import { FormEvent } from 'react';
import RegisterServer from '@/components/RegisterServer';

export default function Page() {
  const registerData = (event: FormEvent) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form as HTMLFormElement);
    fetch(`${process.env.URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        earthquakeAreas: formData.getAll('earthquakeAreas'),
        tsunamiAreas: formData.getAll('tsunamiAreas'),
        tyhoonAreas: formData.getAll('tyhoonAreas'),
      }),
    }).then((response) => {
      // reponse が 200 なら / にリダイレクト
      if (response.status === 200) {
        location.href = '/';
      } else if (response.status === 401) {
        alert('登録にはログインが必要です。');
        location.href = '/';
      }
    });
  };
  return (
    <form onSubmit={registerData} className='p-10'>
      <h3>災害情報を受け取る地域を選択してください</h3>
      <RegisterServer/>
      <button type="submit" className='m-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
      選択した地域を登録する
      </button>
    </form>
  );
}