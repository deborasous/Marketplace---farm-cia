import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import router, { NextRouter, useRouter } from 'next/router';

export interface SubMenuItem {
  name: string;
  path: string;
  icon?: IconType;
  isPrivate?: boolean;
}

interface SubMenuProps {
  subMenuItems?: SubMenuItem[];
  activePath?: string;
  onItemClick?: (path: string) => void;
  router?: NextRouter;
}

const SubMenu: React.FC<SubMenuProps> = ({ subMenuItems = [] }) => {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-300 px-6 pt-6 pb-4 w-full">
      <ul className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ">
        <div className="text-base lg:flex-grow lg:flex gap-5 items-center">
          {subMenuItems.map((item, index) => {
            return (
              <li
                key={index}
                className={router.pathname === item.path ? 'active' : ''}
              >
                <Link
                  className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-white mr-2"
                  href={item.path}
                >
                  {item.icon && (
                    <span className="mr-2 text-2xl block">
                      <item.icon />
                    </span>
                  )}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </div>
      </ul>
    </nav>
  );
};

export default SubMenu;
