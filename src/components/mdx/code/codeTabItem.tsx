/**
 * https://github.com/facebook/docusaurus/blob/master/packages/docusaurus-theme-classic/src/theme/TabItem/index.js
 */

import React, { Children, FC, ReactElement } from 'react'
import qs from 'qs'

import { errorOnInvalidSite } from '../../../utils/siteAwareUtils'
import useSite from '../../siteSelector/useSite'

export const CodeTabItem: FC = ({ children }) => {
  const [site] = useSite()
  const childrenArray = Children.toArray(children)

  let defaultChild: ReactElement
  const siteAwareItem = childrenArray.find((child: ReactElement) => {
    const metaString = child.props?.children?.props?.metastring
    const { site: codeTabItemSite } = qs.parse(metaString, { ignoreQueryPrefix: true })

    errorOnInvalidSite(codeTabItemSite as string)

    // the default codeTabItem is the first that does not have a site prop
    if (!defaultChild && !codeTabItemSite) {
      defaultChild = child
    }

    return codeTabItemSite === site
  })

  return <>{siteAwareItem ?? defaultChild}</>
}
