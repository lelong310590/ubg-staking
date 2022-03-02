import { useRouter } from 'next/router'
import NextLink from 'next/link'
import React, { FC } from 'react'

import { ClassNames } from '../../modules/utils'

export interface ILinkProps {
	href: string,
	path?: string,
	className?: { [name: string]: boolean } | string,
	exac?: boolean
}

export const Link: FC<ILinkProps> = ({ children, href, path, className, exac }) => {
	const router = useRouter();
	let asPath = router.asPath;

	if (asPath.indexOf('?') !== -1) asPath = asPath.slice(0, asPath.indexOf('?'));

	const getIsActive = () => {
		if (exac) return asPath === href || asPath === path;
		const arrAsPath = asPath.split('/');
		return href.split('/').every(v => arrAsPath.includes(v))
	}

	return (
		<NextLink href={href} as={path} passHref>
			<a className={ClassNames({
				active: getIsActive(),
				...(typeof className === 'object' ? className : {}),
				[`${className}`]: typeof className === 'string'
			})}>
				{children}
			</a>
		</NextLink>
	)
}

Link.defaultProps = {
	exac: false,
}