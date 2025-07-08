'use client';

import { Button } from '@/components/ui/button';
import { getAppEnv } from '@/utils';

export default function Home() {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus distinctio inventore perferendis hic iste,
        nemo pariatur incidunt corrupti nesciunt aut illum tenetur non fugiat. Corrupti officiis nemo eaque quidem
        corporis quos ipsa rem id. Ad minus animi mollitia saepe. Ad adipisci ipsum ipsam quae veritatis dignissimos
        libero ipsa necessitatibus ducimus quod, ea quidem in eaque cupiditate ut consequuntur impedit reprehenderit
        voluptates beatae, praesentium officiis? Officia qui corrupti impedit ducimus voluptatum praesentium quibusdam
        in? Facilis consequatur facere, optio, voluptas dignissimos quam voluptatibus nobis, inventore ut id similique
        eius. Neque, ut labore possimus, suscipit nostrum nobis eos autem minima blanditiis a maxime.
      </p>

      <p>{getAppEnv()}환경</p>

      <Button>button</Button>
    </div>
  );
}
