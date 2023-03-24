import { Link } from "gatsby";
import * as React from "react";
import {FC, PropsWithChildren} from 'react';

export const More: FC<PropsWithChildren<{to?: string}>> = ({to}) => (
  <Link className="block mt-6" to={`${to ? to : '../'}`}>
    <div className="p-5 text-center font-bold bg-slate-100">
      More from Anka Szymczyk
    </div>
  </Link>
);