"use strict";(self.webpackChunkrecipe_management_app=self.webpackChunkrecipe_management_app||[]).push([[835],{914:function(e,n,s){s.d(n,{db:function(){return c},l:function(){return r}});var t=s(4702),a=s(2481),r=(0,t.ZF)({apiKey:"AIzaSyDn-uSjoBt9Xb3MsYRb_nY2o0PuEXqSRcc",authDomain:"travel-auth-7b217.firebaseapp.com",projectId:"travel-auth-7b217",storageBucket:"travel-auth-7b217.appspot.com",messagingSenderId:"304864174974",appId:"1:304864174974:web:d2d7b0bbc5a99349bc492f"}),c=(0,a.ad)(r)},4914:function(e,n,s){s.d(n,{C:function(){return r},T:function(){return a}});var t=s(9434),a=t.I0,r=t.v9},7835:function(e,n,s){s.r(n),s.d(n,{default:function(){return h}});var t=s(4165),a=s(5861),r=s(9439),c=s(2791),u=s(7689),i=s(8255),l=s(653),o=s(4914),d=s(1413),p=s(2481),f=s(914),m=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n,s){var a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=(0,p.JU)(f.db,"users",n),e.next=3,(0,p.r7)(a,(0,d.Z)({},s));case 3:case"end":return e.stop()}}),e)})));return function(n,s){return e.apply(this,arguments)}}(),b=s(184),h=function(){var e=(0,o.T)(),n=(0,o.C)((function(e){return e.user.user})),s=(0,c.useState)(n.firstName),d=(0,r.Z)(s,2),p=d[0],f=d[1],h=(0,c.useState)(n.email),x=(0,r.Z)(h,2),_=x[0],v=x[1],g=(0,c.useState)(n.password),j=(0,r.Z)(g,2),N=j[0],w=j[1],k=(0,c.useState)(!1),C=(0,r.Z)(k,2),Z=C[0],S=C[1],y=(0,c.useState)(!1),I=(0,r.Z)(y,2),F=I[0],U=I[1],E=(0,c.useState)(!1),q=(0,r.Z)(E,2),B=q[0],D=q[1],P=(0,i.v0)(),R=(0,u.s0)(),T=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){var s;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(U(!0),D(!1),!P.currentUser){e.next=14;break}if(_!==n.email&&(s=!0),N!==n.password&&(s=!0),n.firstName===p&&N===n.password){e.next=8;break}return e.next=8,m(P.currentUser.uid,{firstName:p,password:N});case 8:if(!s){e.next=14;break}return e.next=11,(0,i.s)(P.currentUser,_);case 11:return e.next=13,(0,i.gQ)(P.currentUser,N);case 13:X();case 14:S(!1),U(!1);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),X=function(){U(!0),D(!1),(0,i.w7)(P).then((function(){e((0,l.a)({firstName:"",password:"",email:""})),R("/signIn")})).catch((function(e){return console.log(e)})).finally((function(){return U(!1)}))};return(0,c.useEffect)((function(){_.length||R("/signIn")}),[]),_.length?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("section",{className:"page__section user",children:(0,b.jsx)("div",{className:"container",children:(0,b.jsxs)("div",{className:"user__wrapper",children:[(0,b.jsx)("button",{className:"user__sign-out",onClick:X,children:(0,b.jsx)("img",{className:"user__icon",src:"./assets/icons/quit.svg",alt:"icon"})}),(0,b.jsxs)("div",{className:"user__input-wrapper",children:[(0,b.jsxs)("label",{className:"user__label",children:["First name",(0,b.jsx)("input",{className:"input",type:"text",value:p,onChange:function(e){return f(e.target.value)},disabled:!Z})]}),(0,b.jsxs)("label",{className:"user__label",children:["Email",(0,b.jsx)("input",{className:"input",type:"email",value:_,onChange:function(e){return v(e.target.value)},disabled:!Z})]}),(0,b.jsxs)("label",{className:"user__label",children:["Password",(0,b.jsxs)("div",{className:"user__password__wrapper",children:[(0,b.jsx)("input",{className:"input user__password",type:B?"text":"password",value:N,onChange:function(e){return w(e.target.value)},disabled:!Z}),(0,b.jsx)("button",{onClick:function(){D((function(e){return!e}))},children:(0,b.jsx)("img",{className:"user__password__icon",src:B?"./assets/icons/eye.svg":"./assets/icons/closed-eye.svg",alt:"icon"})})]})]})]}),(0,b.jsx)("div",{className:"user__btns",children:Z?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("button",{className:"btn",onClick:T,children:"Save"}),(0,b.jsx)("button",{className:"btn",onClick:function(){f(n.firstName),v(n.email),w(n.password),S(!1),D(!1)},children:"Cancel"})]}):(0,b.jsx)("button",{className:"btn",onClick:function(){return S(!0)},children:"Change"})})]})})}),F&&(0,b.jsx)("p",{children:"Loading..."})]}):(0,b.jsx)(b.Fragment,{})}}}]);
//# sourceMappingURL=835.2053ded5.chunk.js.map