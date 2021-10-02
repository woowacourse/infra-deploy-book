import React from 'react';
import { SpinButton } from '../src/components';
import Link from 'next/link';
import PATH from '../src/constants/path';

const Index = () => (
  <>
    <SpinButton />

    <Link href={PATH.CAROUSEL}>
      <a>Carousel 페이지로 가기</a>
    </Link>
  </>
);

export default Index;
