"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[816],{1134:function(e,n,a){var t=a(3685),s=a(7296),r=a(3712);n.Z=function(e){var n=e.open,a=e.type,l=e.message,i=e.handleClose;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(t.Z,{anchorOrigin:{vertical:"top",horizontal:"center"},open:n,autoHideDuration:3e3,onClose:i,children:(0,r.jsx)(s.Z,{severity:a,sx:{width:"100%"},children:l})})})}},5816:function(e,n,a){a.r(n),a.d(n,{default:function(){return b}});var t=a(1413),s=a(4165),r=a(5861),l=a(9439),i=a(8391),c=a(774),d=a(5536),o=a(2872),u=a(9856),h=a(8743),p=a(2600),m=a(4383),x=a(1884),f=a(1154),j=a(9492),C=a(1134),y=a(6118),Z=a(2547),_=a(5208),g=a(6999),v=a(461),N=a(3712),k=function(e){var n=e.paymentChannelId,a=e.paymentChannelName,t=e.handleDelete;return(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(p.ZP,{item:!0,xs:12,sm:6,md:6,lg:4,xl:3,children:(0,N.jsxs)(_.Z,{className:"Card",children:[(0,N.jsxs)(g.Z,{className:"card__contentContainer",children:[(0,N.jsxs)(v.Z,{className:"Card__containWrapper",children:[(0,N.jsx)("span",{className:"Card__itemKey paymentChannelCard__keyWidth",children:"Payment Channel ID:"}),(0,N.jsx)("span",{className:"Card__itemValue paymentChannelCard__itemWidth",children:n})]}),(0,N.jsx)("br",{}),(0,N.jsxs)(v.Z,{className:"Card__containWrapper",children:[(0,N.jsx)("span",{className:"Card__itemKey paymentChannelCard__keyWidth",children:"Payment Channel Name:"}),(0,N.jsx)("span",{className:"Card__itemValue paymentChannelCard__itemWidth",children:a||"Not Available"})]}),(0,N.jsx)("br",{})]}),(0,N.jsxs)("div",{className:"Card__Actions",children:[(0,N.jsx)(d.rU,{to:"/payment-channel/".concat(n),children:(0,N.jsx)(x.Z,{className:"Card__btn",shape:"square",children:"View"})}),(0,N.jsx)(d.rU,{to:"/payment-channel/update/".concat(n),children:(0,N.jsx)(x.Z,{className:"Card__btn",shape:"square",children:"Edit"})}),(0,N.jsx)(x.Z,{shape:"square",className:"Card__btn",onClick:function(){return t(n,a)},variant:"filled",children:"Delete"})]})]})})})})},b=function(){var e=(0,c.I0)(),n=(0,c.v9)((function(e){var n;return null===(n=e.paymentChannel)||void 0===n?void 0:n.data})),a=(0,i.useState)(!1),_=(0,l.Z)(a,2),g=_[0],v=_[1],b=(0,i.useState)({id:"",name:""}),w=(0,l.Z)(b,2),D=w[0],A=w[1],S=(0,i.useState)(n||[]),W=(0,l.Z)(S,2),F=W[0],P=W[1],q=(0,i.useState)(1),I=(0,l.Z)(q,2),M=I[0],U=I[1],E=(0,i.useState)(12),L=(0,l.Z)(E,2),V=L[0],K=L[1],R=(0,i.useState)({open:!1,type:"",message:""}),z=(0,l.Z)(R,2),B=z[0],H=z[1],O=function(e,n){H({open:!0,type:e,message:n})},G=function(){H({open:!1,type:"",message:""})},J=function(){v(!1)};(0,i.useEffect)((function(){e((0,y.rt)()),e((0,y.UW)())}),[e]),(0,i.useEffect)((function(){n&&P(n)}),[n]);var Q=function(e,n){v(!0),A({id:e,name:n})},T=function(){var n=(0,r.Z)((0,s.Z)().mark((function n(a){return(0,s.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!a){n.next=3;break}return n.next=3,e((0,y.bZ)(a)).unwrap().then((function(n){console.log(n),null===n.data&&200===n.status.status&&"Deleted Successfully."===n.status.message?(console.log("res",n.status),v(!1),O(Z.MR,"Deleted Successfully!"),e((0,y.rt)())):null===n.data.data&&400===n.data.status.status&&"could not execute statement"===n.data.status.message&&(v(!1),O(Z.pn,"Payment Channel is already referred!"),e((0,y.rt)()),console.log("not deleted"))}));case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),X=function(e,n){U(n)},Y=function(e){K(parseInt(e.target.value,10)),U(1)},$=M*V,ee=$-V,ne=Array.isArray(F)?F.slice(ee,$):[];return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(d.rU,{to:"/payment-channel/add",children:(0,N.jsx)(x.Z,{variant:"filled",className:"Listing__addButton",children:"Add Payment Channel"})}),Array.isArray(F)?(0,N.jsx)("div",{className:"Listing__container",children:(0,N.jsx)(p.ZP,{container:!0,spacing:2,children:ne.map((function(e){return(0,N.jsx)(k,(0,t.Z)((0,t.Z)({},e),{},{handleDelete:Q}),e.paymentChannelId)}))})}):(0,N.jsx)(j.Z,{}),F.length>0&&(0,N.jsxs)("div",{className:"Listing__paginationContainer",children:[(0,N.jsx)(m.Z,{color:"primary",count:Math.ceil(F.length/V),page:M,onChange:X}),(0,N.jsx)(o.Z,{children:(0,N.jsxs)(u.Z,{value:V,onChange:Y,children:[(0,N.jsx)(h.Z,{value:4,children:"4 per page"}),(0,N.jsx)(h.Z,{value:8,children:"8 per page"}),(0,N.jsx)(h.Z,{value:12,children:"12 per page"})]})})]}),(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(f.Z,{open:g,handleClose:J,title:"Delete",content:(0,N.jsxs)("div",{children:["Are you sure you want to delete ",D.name,"? "]}),actions:(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(x.Z,{shape:"square",onClick:J,children:"Cancel"}),(0,N.jsx)(x.Z,{variant:"filled",shape:"square",onClick:function(){return T(D.id)},children:"Delete"})]})})}),(0,N.jsx)(C.Z,{open:B.open,type:B.type,message:B.message,handleClose:G})]})}},2547:function(e,n,a){a.d(n,{MR:function(){return s},cM:function(){return r},pn:function(){return t}});var t="error",s="success",r="warning"}}]);