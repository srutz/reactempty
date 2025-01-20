import { ComponentPropsWithoutRef } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

/*
 * Use TransitionLink instead of react-router-dom's Link or NavLink
 * and you will experience page transitions
 * 
 * You can customize the transition in various ways. check the docs at
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
 * 
 * by stepan.rutz AT gmx.de
 */

export type TransitionLinkProps = {
    to: string;
    children: React.ReactNode;
} & ComponentPropsWithoutRef<'a'>

/*
 * Use instead of react-router-dom's Link or NavLink
 */
export function TransitionLink(props: TransitionLinkProps) {
    const { to, children, ...rest } = props
    const navigate = useNavigate() // programmatically navigate
    const location = useLocation() // current location to determine active state
    const active = location.pathname === to

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        if ((document as any).startViewTransition) {
            (document as any).startViewTransition(() => {
                flushSync(() => { navigate(to) })
            })
        } else {
            // fallback for older browsers
            navigate(to)
        }
    }
    const classes: string[] = []
    if (active) {
        classes.push("active")
    }
    if (props.className) {
        classes.push(...props.className.split(/\s+/))
    }

    return (
        <a {...rest} href={to} onClick={onClick} className={classes.join(" ")} aria-current={active ? "page" : undefined}>
            {children}
        </a>
    )
}