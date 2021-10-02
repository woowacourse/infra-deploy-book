import React from 'react';
import { SpinButton } from '../src/components';
import Link from 'next/link';

const Index = () => {
  return (
    <>
      <SpinButton />

      <Link href="/carousel">
        <a>Carousel 페이지로 가기</a>
      </Link>
    </>
  );
};

export default Index;
