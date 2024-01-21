import React from 'react'

import type IconProps from '../../../types/icon-type'

const GetStarted: React.FC<IconProps> = ({ size = '40', ...attributes }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      {...attributes}
    >
      <rect width={size} height={size} fill='url(#pattern0)' />
      <defs>
        <pattern
          id='pattern0'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use xlinkHref='#image0_9408_244' transform='scale(0.00625)' />
        </pattern>
        <image
          id='image0_9408_244'
          width='160'
          height='160'
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAChHSURBVHgB7X1tkOTGed7TmJndnd25u12KX7FI3lBRpJRo6o5yIiUyk1s6rlRFLpl0fjiJK9Ydk1ScpJQS+SNVqUpVbi8/Ev8KyVScpGK7eIwqin/EpmhblmXLuqUki/qwzT1KsixbNpekTIsUyf2a2ZmdD7S7ATTQ3egGGvO1M3vz3GEHaPQXuh+879tvNwCCOWLsULpaaXbrvt+tU0rrXsk7S0FWwfYp6CoI2/cpQFA350B3QckuO79LwH7Bfgm2ffgvEZ9se15lu1Zb2MIcMQhuUHCylQ4O1ynBeUaWc4xw5+3EGjm2WJnbjNTXPXibvdrS1hoJCHvD4YYhICPY6sFB8yHieed8n7JfwqVcbjrCRJhLvKJxDdhiybfg45l+xdtaq1a3cQPgRBPw4KC1Dg8XGCnW+YZjRFFyMgm5SYn/TAkLmydZbZ84ArZarXrPx0XW2ZfYxdV5lwcXyQiAiAAiTD4nyKGECyRJlXA5XrAflUFt+RTIW0nD7EiP4pOlEnmiesIk44kgIFev+83mJc8rPYhA0sndT7Vel8Ncel+cE3la4qTy0MuW0ouylWMtA0rNLCbYpL7/1Ola7SpOAGaagIG0Ay6iTx9hNt0ql2JMdUk00WUUIF+ynVIm2ZWXJq88e57pPBBdhyxL1RowabvNfjZLHq7MslScSQIetJhtR3GZUKzrggzasX5OhxA8epxUnkgTz5Z3Nkkt+WvCmDrkRZJEV2eViDNFQE48RrrLbHfdKBwEsno3Dot+nXpai+sSX1azRQfGNgbmM3vmiDgTBOSqtk/xJDjxhgKJ+rDQaLRQ/HQ6o+yE5c5BWgUXByHeVQ/+TBDRwxSDDy4ah+3HGPlehAP5SHQ/kYwRhejUQH25gKh56+WY9kVJYk+/z4klDxS8MZK0Wt2YB4C3WaPZepLfvJhiTK0EPGy3P+b3scF4sloooclmB9yF0KDluMYvqs5d4mSr6W3q0yu1WvUqphBTR8BGo3HeK5UfYybbuqmzYoeu5mlJIkhpdKedhswBComyLkIaYolD9GuIstMHynpdo3RBPfVzWTDUjQVtE0IfmDa1PFUquNU6ukxK5ecpEvKJUWqgMoMDmnQYiVSO0EKqv0xVyUTLR87Dco7CkKeWNlW2dixUPf8Vaamct0kEkISkIBqXpPxFfZV6m9qEBM7sug/yIm9jTBGmQgJyO4US72nwBQEy8nwoSUQkosLkf4nO6/GVeBZd7VwHS52sx1nxddGZl7ZIngG2mR6ZCml47BIwsPWo9zxrm/OyGIl9XMQmbmIxkGQm91HsBrGIJkSSIxZFQi5J+UnkJFpeybFFhKV+qSG+TXyKMpJq2MWuaZPL1NKGmfEb/nnW9o/gmHFsEpCPcFtHPaYO/LARTDabqXZRuFEm6PyBZjsRcxhy8wlT0az8LektctWah7F+WdccxYvvJZ1zNhsyzpc8Xl2sXCHHtBzsWAjIVS7xSk9TXeU6wdoNA8CkiotmMWC6oTHKdsA2qH8sKnniKrjV6q5z8Z9Nviy1ljS6sy/PmqfUga4kImYV7VK+PCDJi5ufZ5496VKlOF4dxLvW6XQGEAjDYaIE7HR6F0HoNY8vbc/sBL1TzXd7ijN6noRkdDaJRqZES2KPL5RxfCyWcDn1dyJpqTxQksqNyyZSfOm8/CtFjEbBqv1C9BvFlJeab73v0+fbE7YLJ6aCj7rdy8whuqGH62M9OVygCFXTearktZVnx0hVndUXDdivw3bsWoarLI2HKh7ZWKxUrmACmAgBbeTLw5BL3I8t72lH4sy326+TIuHYVXC7031MJl+e/VP0jjDlRzTVZjo3CPnc1bVb+rzw3PyKxJUix9duaIO4fVifccGBMWOsEnC/0XxyoVK5FLqxSOLXM1x46BEg+YMB4ROT8kqp1egO11Wtoo5y6gNDGkVVxemT+uiqDHJZgLLsX7lmcRzblFH9pTL0tYLy8v+4CKqWpzyCoLWVfG1Uy1eux1Gnc/V0beVhjAljI+DBQfOyD2wsLS6kCrwxFV+IcVz/ONu0fdQBGzQ+fqq2/CjGgLGo4INmKyCfOFbuckuaYBSYcS7eBxxHnVDSjBLDlG8aFJCMfIlDuYOQT803+4J8Sh85OGiNRR2PnIC8or7vb4jjUDVQpZFDh4a0RW4HoQJEOKJfoU5j1UENeSBxK8hpRaH6ebkc47FWBzWMWK4jbXvKKi6VJ0k0eHhh6g2mly+ft10/bPWBRny5DKl9bTe4D39jHCQkGCEajcOP9Sl9XA6rchUs94IOYzjRTlJzmpCxUqC2S/SC9Xko+bShHFvcon4OWOLKZWv2ZKpOprKtdZXzMJwX7ZaKo4Wx3RZTwUoM4l06Xas+hRFhZATc4ev4KHleD68uLWoh1l4w7idjhDR5kifgbKa1iGWiVhYxTSn0c6qEU/MB7Ndoq0e63nod1Sf+8vLNKksNy8q31T5K5eLDe2DtVHUTI8BIVPAOm9v1QJ52i03U2SypI9XGifapHI9IeRBJ0KXTyatXqJpjqiyRd/JXnE82YsqB6HnLaSCpUrXTVTVHtDim8sL99E2kt6VWhiF++iidb7x20QIP/tM7I1rqPzQB+Ut+vL5/jV1F3XQ+tleI2p2yjSLbPPoGov7G4dS8r9JULReWc0HeWkcqm6V+Sh1SNmVyHoa66XWO0xNzGlOd5DL0NhI7Snz9ujPClbqn2bjq9RgJd3aKPS5hwNAELDeYYWohH0e8Ojc8CDYq9rUeIibrGnDskex0xtXDchw45GVhAdGZYGCsXG5qBbOU3rSa2VonZNRTO6/ki3QadR5ajWtx2p8vVxYvY0gMRUA+6PBBlclrNgIONl7pYNMnxgMkjk411Byuw+6wKRbHFM/09Js9HkVYa72D0rYgjWwtfT8+1kbQWWWLMD2OKSwLyUjdZANGe6Ifo00Gd8/s7R0OtXjBrZcMCOy+Xp8NOogihgPy8Z2orqdWlvjIKV0qxeAYJL0pjR6Wd5yV56SuyRavaLgtnhSf92Wz1VYmjEqllMza9cvefYO+Tm5gCRjYfRr5OHglaSABQynY6fXVCC4NoqlHiwA13z7Eco6a89FWMbnVyxR/UPIR5cd4TtnPI5mpjgTGAohJXUtt0gu0WSj5OBktFxnYgxgQAxGQT7NlDTo4Cf1IZHe7PaudEhvS+gb1V7it5HSq/aKmle0Z2d6ihvgUhvINdVXyJhh606/BWA9k1EW6NuWpP1jKMKSnUjiR7gQaXWer3WH9GJpUPjXdwTHO7x00NzAASMH4ker1X8yKwyaw4xuPY7m6FDqkrVUYRHxI6RJnoXTaFgaYdTEkKaPposxqyOVkialUwqiIPLvAkjbr2jPzs5Wrgs8Bc/UrY6FSybTPfULvW6vVCr1Ms7AEDFWvA3waiG++NQ/b6PW5Ks4QAdFGiKsYQZJWvpXjMMlZTAy3vLJFJ4IxhaFjSEYdqFyuCNCui+jXHJVp4wBJt4u1zaRrildVS6qFSCIxHm1TCnubEtZXoe3nx33IXM/Mjs8bHJao9xgKohAB9/cbl5DhchHgd0rYl5H9wMT47n6DP4IJVZ0hxSdFTQoY+iNMmzhMScrhmBSiq16jyo7DSJKv6FAKi7lApLAkTeocTV8z0Z2QJLno+K9+vZDSQsovSkGVRoTSnglXiVRHldM8X95Hu/sH6Pd9ZeRbKpeQBxZ7veiomLhGDFRvhsNZB7f9jrqdqBASV9HzPNRWllEpl9mWf1GTg2DKNEKu2+jr2WcSjqvcI751u0qpHAsLC0F/OWLX73XuXltbc3rM0znXUt+/TB3Jx1GplIO756jTZc3lx+E+7WN37yA8MLYrvy1pMvKIjV9NZcXnkB4Bpky/5H0ygc/LlC5vH2qYvHDTlk5e+h4GUUkkpUkk19NYhiWpsS5SO+iLTJV9EY9QrRgSDDwWi5GPYzVyUDutH3SSgC4DDxs67I7id5e8spfoNaDmmilxDXxTohOkVw0jzU05rzhc6zAq5ZlSZ1p0YrqOjLoQQ/5KPrDfC7Z6QDvnrNakAijU6yUeCcjHzalBwHyDd7v4Bp2oHUg/DAZ+AeVSKSBhJxLvSl62jDUyCMOZWpqYGohCU9lFaZW4nAHmLjOORwBJnofpQ6mqBCq7chq5/vINZbouuc5UqwOFrenCGol984oh+QKTuJSGOZeZxFteWgrMpUFR6tEn2c8DefFyb5ZhpJ8OPprq9nqBfdjr91IdLBaeyiOQ+NkIC0zn9TD5WOzLv0mRhjTK2jxbfQSxKZDybKt5hmURERCLHbUYmRQwtElESa0sSpGum9F/p9aLE63ENi4oFpm7LG+06wqXZVu5EnAY6aeDXygX63yb4+SjBHqZ/Wxmxcmk+iil3xw3JvKkYKaS59IPc8wxBCIpaIWVgFz6MfPhEuY48fjEN32c/bk+3vsLPXzqO6MyuEJw53TW6mkrAefS78bBzz7nY++I4uV94N98po9Rg5lxl6znbCfo0N/kmGMW8MXvhsQT2DsKw0aMj9mW7xsJ6DrnO8fsQ1a5YkT6xVdGTsBVr7J4yXTCLAEJLmKOGwJfeCWer4ud5V8YPQH5TN+DxnA9YBjXC3e09nod9Pv9aFX06C9kjtHhlQOCD3xiKdhX50SAb19q4/Ri4jgngaO6DI9vA86QmKbnUjl5vX7hh0z48vt2+xCtwwa6nQ58TsA5+aYeX3o16X5ZEvH933wpWakULKljfdrpHKHdaqJz1I6W6BeDaTCSpjIhRlFpA5d47dZhUME5Zguf2U4mwnRx8dyr9qVyvV4XR0zg8L4vBINppxCQv16jyOCj2z1id8PRXNrNKL70F4nc022xT7+YPR8cPHDG+p5zwBmMWzsHrXU5SJkL9gq4Xjj7ubrVwVe/LC0tsUntRZRK07TgdA4Zm9s97B8dpk9ECzD2OwR/1Hob1utl1td8AUkXjWYzsO9lcA5wG7Fcdpvf9+CvQ5ofViSgbaSig9t8Ovk8VonTp07hpptuwvLy8px8U46nXugFv/LStUDmSdpMxOHLs6rVKm65+eagjz1ttUxg9zvahGw4c0E9jlBk9MuNUG4HCPAKceKVi62cneOYsL3r4x3/rWE9LyjIpdPv/0wN529ThwpcIr711lvho5oiLhM4S0vLcIHf66yJJftxzqVu1+kjJVz6yeTjqNVqc/LNCHbbFA/8n0T16qsXhSQUi14ffqYVpJHB+5r3uYwino9SpfKQ2E+o7ZWc1G+/11MzY8znKneO6UdIviZe2g3VpSCZgOwHFNv17/XxI4ywOgl5ny9o6zp7XbdRMQ0+TBnCMwVmga9kllFbWcEc048XXuvjb/x8kxEqsdUsj+IoG8cWI+H7f6GJl/dUO29pUX35aN93dMVJrr6gDD5R7JUXdlzScmezLGpvftvb5up3ivGl7/bwf1/o4up15rvrBe8LUCE/HpAB/gTtItsunlvAT91bxgfvKAcj4u+/8YaUlYfqsptAEnZgwBxGoPOufm1dz8/JN104OKL43HYXz73Sx6e+08Ubh5QRLyRZ8Dw61R8Kc7PbaJTu/32jg1/51hHecZOH++8s4z2nSjh/i49bl2kwPnBGaWGd/f1kwB4f3jrmmFm88FoPf8DU5O+92sOX/7wXSLpgCzSi6Um7NLIe9TThu/s+nv6jDn6jXAkk4/sYCd/Lth/6AR/vuTl/rtgjgckXEpD5Zs5RzGczZg3Xtjv4+efbeItJuU4/Ilz0FF385o8IxmeZLefFcSoulR8HlR5qZvjGWx7+ZN/Dr2/38fZaHz/9gyXcd2sGEaMxhxfu0zrmmDn8/2+10exQyG81IPpbEfizwRKLPPU0xFsbUvtIj5JVJE8bU8mbzQXZ91sUT369h0x4OBf+hJj4h4rnGB6cfCR6DJ3or34gapiQiLqVFr5GOT4QqcNDpP2EIn8q25IkTdRqOUeZ83lhPvgNFiDMMZO4dI5Nj62YllSpdDBRwcs4p8fRc6TajpCAIny5QvDj73RYM1hZqZdLvl+nZD5vO4tYry8EGx+EfOGVLr72ah/ffL2v2H82ey81Byy/XCc6pob3nSiDZiJelQLcc5OPczezQcjbl3DPzY5DGb9bL1PPq8/HH7ON995WDjaOVxs+vsZGwr/1Z1188eU+3ujJijMin0S2mCo0sek8qO42xayMDk4vePjQu7gbpon72ch3pRLGX15xHUfzN2WQenn+8NHJwg/UPDz47oVg43iOOaI/8fUunrqezN/H7+ARx1Alpi4dqXTin9xTwT+9t4IP3hkS/nuv7WNgUL/OTEXv7NwFc3Lxt9mMBd/+3QcX8aMfP8R33vJTallXwSaf4NnTHp7+R1Wcu2105hohpTNM2vpDf25pjunHXayrv/ovVnDudsvggCZPx+mLEs7dXsIf/MuVkZIvKpPZgIZvfYwDDeYy+OVvdZjHvoevMhuly5ymXZ9/iyL8DY77/JiEx35y3JcmMG2O1JQRLUFPw7+1UmFtycwYlKP9SvRb9mhyHIeF++9mHv5/+NcX8ffuns23e60uEVz7yAru+9/JihgOpX0027C+6rE0y0HaUYMSynKnGDsBX2v6+OinD/Dxr7exxQjIL4VNxQSbsvoi8F0lH0/2omOj01QHVUkq/xJLdPHpFRo5UIVPjL+oMbz7STx5z3/+dMfH4185xM98ah+vHxZ/KmwawIn05INL6ROWdwJ+bkzkE9XxWBuPnYD/4XMNvN70NaJp+zIhierRjw1karBWDQ2nuyCEKhH7PpWIJ+37kMmYjARjp2v0y69lY7OBw+5s2s7rZ8u4eC559a6+FF+Ar3zhEnCc4LmPlYB8vvKNSFoYiYZgLjpFTl6xQEp60oohQJk2CgPVhtOlH5BIWEi/CvmgEVIK9yVi+lKc77Nr+o3vFHgibMpw8XxoRujtJd+sl86NeaUT88CMl94MQSdppBNISEgjdYvwKXxocUwZSyM2k9tAT0MNx+FElk46NUwuTiEs+/OH38+Z75xirJ8tBapVvzFFe59lku9CffxL7cZOwJd2+5J0o5JtZ9gAZW7TRFqOlHTTIujki0kcvycasYrlS9jM6leSgH5aQvL435xhAnI8+G6JYFobcoJOAmMnoEfSNl8cjmSwAchxqGojanmaXsRtHR0DymS7ooKjc4lqJSkpJ9LLYX4sdm0lzgYu1NXXbwS//A9r3/X6ZBYaj52A77mlHBQSfscsIZxOLlUqkiiNOiCRiaRDlnBKXEu4TCpBpkT6kZho6QFLJEXZ712nx958Y8VD79YGIgLsQi+cFAnICSjsvJS0IyoJCZXUsCApVQcmHLLdp0CbvxT2oImwoFBI5is2XvztdslNg9T+h/7aImYZ3AYMJB1JvkNCIuk37tGvAPcDbmOM+NA7F3HrsidJMqr6/+SRsWILplV33EiwK7+YdFAHJYBKWmHfycfxIMTX7EFoJGRxbq4SPFAfv0OaP0TOX6OhPxY5KgSSTjJNJin9GHbHTnO+NmzjQg23rXiRBCSaC0ZVxzFRNTUdN5AyjCbK3cvhI03OrLVvqnuFxM7olPqV4vIb6j//SA3jxpVnj4I3GPAHyd/HZi+2d0fv/DaNdC+cndCDZoQTkP3BmMEXTf6vHzuNRz6wjHeseVHZMI524zAYSMlB1RW8+soOWeLF0WBGWq3SWMLJkUQcPhf6kXsX8XP/oIZbV8Z773KycQJykOj40c+0MWoId4wAV73r9clJwDK753fphEZzfA51VudRJ43rr0nSLprnfval8byD8b/+/UX8p893mJoHLl+YnF1LKNkts+t6aca9CScSn/y25GOMBlHcDuRvKTh/+2gl1CU2K3Lp/OQFA9NeexNRwXMUB38nC4c+gBqXFDwWELrNCbiNOaYK3N7biggYu6ii32e+PduzLwqIt+0R39/GHFMFvnxel3zid5wumUnD95kE7HvedpFE6rwU5hgxuPTjBNQln2ymX/n8FK3CGYYPXoWp4G53u0gaqv2bY7Tgrhajv0/yfz7x5Q6e2upiGjAMH9ZqC1te8KrUArMhNPK9iW2O0WCPqdV/9qutxMbTHOz6dOI//7UW/vvXCn4mYQwYmA8EW/wn8Kay+b8t13RzAo4eX3qlhx9+somPvyBJNXnljggTy8mi7d9/to2PfroVvKnquDAwH3zm/kP0mQaW9Dr7ecgl3Zxzw+OgQ/HtN/r47Rd7gbtlk7lWWl3VzhPz2JB+4weGSDjfw49+6ZtdJjU7+PC7KvjhO8v4m28v4V03Te5NFwPzIZKA4evZaH/L+fUccwYODE6Uz7/cxVe+20OLaVpOOv6rry2UF1HIv0kECl08fvbPuvjdV7qoVtjUZ5UERPxXP1Qd+5ThoHzw4W3y36B2/X5/0zmlF66b86Ot1ztBfqkxYnO7g198/jB4jwvSK2zln3jBrSwBU+sbqTzwlMjLAhpdii8zkv/HMT841eHfB5G4UGhGrddObMAiAxGPeKDSIrpWq4U58vHsy2LAoFJGXpQRw7bgVj4vsVJeVCFHfP2Qderu+GZO+NeT5AWVnueoRZn6TX0nhOnhZ1zS8ndCy8PuwzkBnXDXmVK0ukd6EKjoHLyWQF4VFJ+nyVpGvnPLGFXw7t6ewoVypeKUjtUyHvTGtSMUTiPhxaWq8nBOq9XG/v4B5sjGT75nSbXHSKRqibouUocyEyJJRmqSfprg/Ml7lnDL8ngIuL+/zyRgT+HCwoLbSpq+j1jYxddc5FMN+3u7ofiNwD9g/Fduvy314ZI50rjObMA/frOP32GDhuuv+3i9SaPBCAkGJEc988DDNCBZLPM3kSIYeFTLFO+8ycMH7yixAUgZf/euClYWxrPMidt+f/G915Tvwy0uLaFWO+WU3u95d6+thR+uVmq4f9C4xrxP67kZ+H3s7uwoFeAkXFtbxZnTpzGHO/hb7X/pG+Hr02QCumCBke/2FYKPvn8B//ieCu6YwENSe3v72Nnd1fqeYHXtJicbkBkgm6dPLT8gjpW110yPPwsHAvKCqsvLaB4kqpd/K+zNN95kFdzD2uoqFhYXsTiXiLn4W0xa8e0DbOMroP/4TbNTOeWKYfg7d5Xxix9eCt58NU5wTwf/VOvh4SHarfSq7OpyzXkAQgmUsYZyTTsHB+sevGtwxGGzgWazgTlGgz9vlvDhT60G3+rNk4I/emcH//PCEC+HHBFWVmpYXnF/PsYnlfv4HLA4Tl3n3n7zRRZahyNa7K5oNhpsFD6bb4uaNnzltTJ++rPZr+t5e41Z8R/awenK8U0K8M9yrdRqxT5UScj2mdry3XJQ+vEn4j/FlOxlOIKrYq5um42DyCcoPzwJ2Nfo6L5+23kX5JUFxzro+eh1yDtGRl6m8tJ5vP/WDj7Atq+8Hpkv0cvCZUnxb3+wiVPlfjQS1vPKqr8ex6UP0nH5YPP0mdXiHyWn/jO2EmLs7LTqXtl/EQOAf7zu6KiFdruNHhuiu35Few4VX329go/8zpoaGBHxjhU2gv7xNzFJlMqlgGzczbK8vBIMOAeBPPoVMJoarqPhOcaHs/+jhz3DU5j/+n0e/sv67L0SRB/9ChivRB+pzDF53HsLSZzMURj/vf8OzCT6lJt2aRgJ6He7V9nP/Gm5Y8SP/VUC8a5E2VK7/84ZfCESG3ysna5dNZ0yXk04Uew/gTmODffeSqC/bImHnZnB9yExWb5pO2e9nfxe+SrmODbcfwcJCCerX27/zSL6Xe+K7Vymv3M+GDlevMz8zD/7nI+9I8pUsoefumc8c7vjBLMirp6urTxsPZ+VuOjMyBxz6DC5XmRkyvS1U6c2s/T3HHNkgUu/LPIFcZCDUUpB7kg96nTQ7fUDJ3VRRzUhGOgRhCJzKpPA1NWHNWyJOZcXFiqolMsDO5p15Em/oGw4YFhbkBPtkM2O9PvRq0dzmZQ89RW7IOJXpNJ4VkDEhIiD8HkVIk1fxZNiWppksswwZRanJ8FKXem5yLh8eT18Ur8kV70e0MsMshB5QV1sGl1LXBZV65Z3HJQpt1dUZlAnGCCuJ4paYURcYtNtwxAxz/aL48EBw0zPdbpdNj3XAU3NiXJIc6YyMYmZGlkzsWmpYqIYVXMNmZOeEY2euRCEVkqI0sQpZBJZ6ga9XkoetqsxJVXbRqVsRjqlrvp1mcvmxSyyqbeFymBvS3WRfklpDtg7OHicmYwfQwFw8nU63ew5eNs5AVvbmns3gUGwGcvSw2GJo8cFjPeRsd62ay4CU52zysmqi96+xLIPBGp5wfFZj7hqjtJPVMkJ0ZL9F+H4aa8es/OOup2oEKEWmHhnF7PIRfziQmB3cGS1iS1MVXvusJVlKtN8PpEeSXyzPALcGtjGATNU8wTO6ezo9vvB4pHGYTtY7Q5IapzlzAnIH0ZzApv18LvkARfpF0RHAezsNR7xPPJYXjwx2JCfHuTXslKtolpdjEybqCOF5gWMkiU+Jx2HZaTTKeYUkbKxSVoHaKan9ACaZFOKcqV66mnVTNX8jGadKS9qrpeerxLHds2WdmgdHaF52EpZRHx1O3F4jM+n9GHbtJsJhW8alwEJX8Ldl0a4vOJnTq0wiSevH9NaRmnRvGqZ7n8JRsnoLmMy9WeKkXCoYxYL8tLa8tLj63na2ojk1BPBYHGv0VTe9cKfB6/k2YOGBad5KDzM6RM8mhfHD8S3F2/LS0uRuqXSBigXL54rJHqjSfEJpDj6OZHOICqUvIhWvmEjaocodZWff6TUnoeSTs8LUj1saW3HyCgLOXkgp6wQpVLYZ2H/keDXep9J4KoXBVGYgGu12hYr6ortPHe58LuFfw+Ef36hzC5mcbECe1dR9Ziqb5tT4lEqxYEhXQhTeHKOxvmF9pyhu0z5x2lMXUjcrs3hHKzx3TdodRI3uWs5PD7vs4VKKXDF8KfeeH9m+W3ZmSuudp+MwipYYO+g+Tz7Oa+H65Xkg41KefAPn1i1KU3vm2ynJB+ivj5Mz0MGdSwbhjL4yQJpMu0z08iX5qR1hS0vKbzDTCnuQkvihERM51Vc9QoM7Glkfp6fgGHNYPChQS8S3eyXi3MT9LtQDlPOm0hCzUQTT+ibiKV8DdJUGXmTrAJqigtd2iRlUL1TAeUtBrDkZwzTy6eGeFkixHIulPKWvKU8y6VSpIKTzYDdQVSvwMAE5OLW92lKFcdvdoo/yZW4LVLKVdh0UVhieVEpdrRHpVfAEjU3pXw5JUWq7HhPUfXaP0rT8VPlJecg7RHpTFI+la7MnJ+tLgTIjkPtaWE5l9DI1C+Irz/8QpVEQKThEzqQ6hUYatJv7UztcdeFq6a3Z1JNXMQkU0QhTaVJngaTwpRGJEr+1CaCTKLX4RxFuk7xmVgMR+FUShPcc5LPJtpEfqkupjqRw1ipSKm0JC7TRBuK5Kag1HIt8n1jgQ/6BBsTPI4hMLANKBA5qK/BYA9yLC+NeAmvxf4bKr1LPoPaW4lYd8unSDmu9TaVn2V7ikMm9Zoty/fpAodz9b61NTLUoxtDE5Ajmivmg5LULEnVQMBh2tiFf0Vtftt5xfGMdL+ZvHzGfiWwTtiozu10PDlfwFy3rDJI9IfmNLhmYsdotY9MlS402+Fa7lCwLduqLi3AnSpF4gEmKoYT7bDkm0UZV9E66JA2L60tDxcxnZ2v6gHQ2yq7vVvtTioPv0eZ5Ks5v9g+CyN7yIAvXuXTMKkTgS0hbCGi2hZinig+RzXbiyBuDCqHiQgaEamwYahavkgfRkjKpnIdpDIUm1Gqs5IX0epE0teplKPlq7QD1DjUUHdj3lIca30JqBKfpprGeh1UakZBPkIfHRX5RIkjBfMPbrCfy+KY+wGLIEsuKfE0vx5RdkjKuHaRPUXrCLXIlLrOSqctwbPGMapVqUAKd3VctByONvMDSm19hU2pbmCEGPljVryCfsZMiQ6SHvgZf+MXeIvwaHWNOKcIEDoqqpnrqucuypXktZoO6XRGH6MhjgniGqkWz7C21QqXcpLzNJjpGDX5OMbynB9Txxs294wucl25YvKkyNo0Nz2GR25HIZ9U48SY7rtwmm0M5OMYuQqWsbffuMpU8EWXdlGXN6nVUlRtxjk5n5SK1pfpE2KUlKF2k5e109QQIiutYj5Eqs2aD5JIVCvbBqchSdZomtjNE/3ag2V1R52nzpyuXcKYMFYCcrSOuhvsUi5jBCA5nTNJiBshrz7HXeehyifkiaWFyiMYI8b+qH11sbJBDVN2g8C9ITPuKzKaey7r22iylD7uG2bQ8tnVXRk3+Tgm8q6HanVRIaE+wBD7tnAXqPaX7t1KE8I0kEBGfWhGmam0uqsjA7brNsVzCSt63tTWvK+qi4sbmADGroJltNvtR5h1kbuknyOtOjSrRzzNptt5gDC8YkMozsvFP5GuCdxvA8nJS4T/TTfGzHXIU+k229ZUtqmtoDmi47YKC03iUPJwtbpwFRPCRAnI0Wg0zpfKladZ0XXkesvykBN3IMJNCK7zc0XTG8hmdgSpbcf2dgn1f6JarW5igpg4ATlarVYdxLvGdusYCEVIOki+48p/OsG/F039PiffNiaMYyEgxw6lq5XW0YZHSKFnjQUKCQnD1EWovjPSIUmTK6yQ5Cc/SaaXPcyiBLnuEHUj6XKtsF0zG+nygSIj4bG8kPTYCChwyOxCNsF4mdVkVVUXOqjEDMt5OW3c2jb1Y0o7WB5h50tqzyBAzQSxlAsTg03xNCjlZqUNbD1GOHpleXlpqPV8w+LYCcjBVTIFV8m0bo6RtGzSzSZSJCEkJx/1WH3Y3EAHEKta1o1/IDUYcHy4xFyu5ddF5Fmulf3fiuy9bRwzpoKAAs1Wa4NV6XKRNKYlRXon6ueyus21jFHBpT6udbZRTgW9slKtbmBKMFUE5AilIbnGbu56HCgJFpNmyrLn4vSaUBq4V+Eg0GzCuWjZprrAkHeecA7baNPv9x6t1Ua3lGoUmLqXDnO1sFxdups5Qx9mjbYdBFLEDZx6voNKYXKg3CNUCtOjGl2x0jFNx1HLo4ZsqJkQmWVr+cGSPhWF2pOE4busOo+yNn1g2sjHMXUSUAaXhn3fZyO00kV+bFKDRdWjHt+WXtiY4sGeYcqQRZS1vDzH+wBgNX+ixmahjmuE64KpJqBASERssNoGRIw7Ubbabfs6dIvedh6u5ySi6CpYSic/nuqe9wCgwfd7N1lpD0/DICMPM0FAAU7ELpOIHryLygmrDZQxUrQtSU7FQ9p+dIV9oO5WRuHyyCYl9MqpCc9mDIOZIqDADiNiiatmnYgWxBeprQnU49gUoAuPEvcIrMvjXZbhDwKW7ybt48qpU7NDPIGZJKBAQMQ+k4ied4ERqx6G2jx5Anl0Kjo8JgYvpRxHroOrqCM58QPsMgf+E70yrq7NgKq1YaYJKGO/0brELoZJRLoeBJD4D9zmqjTkeYT1OKl4GaJQKccWHv1J+3s2fdBn/JXq1bUpHly44sQQUIBLRa9PH2H9+iBhvkSdM8g4dl097CIjrbJOU8PqufSTftHRNqH0qXLZuzoLA4siOHEElLHTaJxHH+ulkvcg69h1zBD493XZqPlZH/4mf+YaJxQnmoAyuGREt3uejaAfYqLmHCzvshk3rFKWMqc7YaqVYgv9lU8O+86VWcENQ0AdOzt0FeUGJ+Q68ci5YBBDR09K40pnwlRqsAaPXvdpnxHu1OaNQjgdNywBbQjUtu8zMnp1z0OdeN5ZdrxKCVllzbXKmMRfwGT+VAUjFn+Ilk1w7jKbbRdeaZuRbM/3fSbd2OZ521hZ2T4Jg4dR4S8BDF0HboZY7CIAAAAASUVORK5CYII='
        />
      </defs>
    </svg>
  )
}

export default GetStarted
