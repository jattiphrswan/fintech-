import { NavLink } from 'react-router-dom';
export default function MegaMenuItem({item,closeMenu}) {const Icon=item.icon;return <NavLink end to={item.path} className="mega-menu__item" onClick={closeMenu}><span className="mega-menu__icon"><Icon size={19}/></span><span><strong>{item.title}</strong><small>{item.text}</small></span></NavLink>;}
