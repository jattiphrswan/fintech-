import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion,useReducedMotion } from 'motion/react';
import MegaMenuItem from './MegaMenuItem';
import './megaMenu.css';
export default function MegaMenu({menu,closeMenu,id}) {const reduced=useReducedMotion();return <motion.div id={id} className="mega-menu" initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.18}}><div className="mega-menu__links">{menu.links.map(item=><MegaMenuItem key={item.path} item={item} closeMenu={closeMenu}/>)}</div><Link to={menu.feature.path} className="mega-menu__feature" onClick={closeMenu}><div className="mega-feature__visual" aria-hidden="true">{[1,2,3].map(n=><span key={n}/>)}</div><div className="mega-feature__content"><strong>{menu.feature.title}</strong><p>{menu.feature.text}</p><span className="mega-feature__arrow"><ArrowRight size={18}/></span></div></Link></motion.div>;}
