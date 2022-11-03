(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(3934)}])},3934:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return C}});var i=t(4924),o=t(6042),c=t(9396),a=t(828),s=t(9815),r=t(5893),l=t(7294),d=t(7219),u=t(8575),x=t(5678),m=t(7632),f=function(e){return(0,r.jsx)("button",(0,c.Z)((0,o.Z)({},e),{className:(0,u.m)("active:scale-95",e.className)}))},p=function(e){var n=e.children,t=e.triggererId,i=e.onTabOutside,o=(0,l.useRef)(null),c=(0,l.useRef)([]);return(0,l.useEffect)((function(){t&&(c.current=Array.from(document.querySelectorAll("#".concat(t))));var e=function(e){var n;c.current.includes(e.target)||c.current.some((function(n){return null===n||void 0===n?void 0:n.contains(e.target)}))||o.current===e.target||(null===(n=o.current)||void 0===n?void 0:n.contains(e.target))||null===i||void 0===i||i()};return window.addEventListener("click",e),function(){window.removeEventListener("click",e)}}),[i,t]),(0,r.jsx)("div",{ref:o,children:n})},v=function(e){var n=e.onClickAdd,t=e.onClickClearAll,i=(0,l.useState)(!1),o=i[0],c=i[1],a=(0,l.useCallback)((function(){c(!1)}),[]);return(0,r.jsx)(p,{onTabOutside:a,children:(0,r.jsx)("div",{id:"adding-window-triggerer",className:"fixed bottom-6 right-6 flex flex-col justify-end gap-4",children:(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsxs)("div",{className:(0,u.m)("shadow-common pointer-events-none grid translate-x-[200%] gap-1.5 rounded-2xl bg-neutral-500 p-1 transition-all duration-300","absolute bottom-[130%] right-0",o&&"pointer-events-auto translate-x-0"),children:[(0,r.jsx)(f,{className:"mx-auto rounded-2xl bg-red-800 p-6",onClick:function(){n("expense"),c(!1)},children:(0,r.jsx)(d.ego,{className:"text-2xl"})}),(0,r.jsx)(f,{className:"mx-auto rounded-2xl bg-green-800 p-6",onClick:function(){n("income"),c(!1)},children:(0,r.jsx)(d.OvN,{className:"text-2xl"})})]}),(0,r.jsxs)("div",{className:"ml-auto",children:[(0,r.jsx)(f,{className:"shadow-common mr-3 rounded-full bg-red-500 bg-opacity-75 p-2.5",onClick:t,children:(0,r.jsx)(d.Ybf,{className:"text"})}),(0,r.jsx)(f,{className:"shadow-common rounded-full bg-sky-700 bg-opacity-75 p-5",onClick:function(){return c((function(e){return!e}))},children:(0,r.jsx)(d.OvN,{className:"text-2xl"})})]})]})})})},g=function(e){var n,t=e.addingType,i=e.amountHook,o=e.noteHook,c=e.onSave,s=e.onClose,x=e.className,m=e.editingId,v=(0,a.Z)(i,2),g=v[0],b=v[1],h=(0,a.Z)(o,2),j=h[0],N=h[1],k=(0,l.useRef)(null),w=(0,l.useCallback)((function(){b(void 0),N(""),s()}),[s,b,N]),y=(0,l.useCallback)((function(){w()}),[w]);return(0,r.jsx)(p,{triggererId:"adding-window-triggerer",onTabOutside:y,children:(0,r.jsxs)("div",{className:(0,u.m)("fixed top-[10%]","shadow-common fixed left-[5%] w-[calc(100%-10%)] rounded-2xl bg-neutral-500 p-5","sm:left-[25%] sm:max-w-[50%] xl:left-[37.5%] xl:max-w-[25%]","pointer-events-none translate-x-[100vw] transition-all duration-300","hidden"!==t&&"pointer-events-auto translate-x-0",x),onKeyDown:function(e){if("Enter"===e.code||13===e.keyCode){var n;if(!g&&0!==g||"hidden"===t)return;c(t,g,j,m),w(),null===(n=k.current)||void 0===n||n.blur()}},children:[(0,r.jsxs)("header",{className:"mb-6 flex items-center justify-between",children:[(0,r.jsxs)("h2",{className:"text-2xl font-bold",children:["Adding ",(0,r.jsx)("span",{className:(0,u.m)("income"===t&&"text-green-400","expense"===t&&"text-red-300"),children:(n=t,n&&"".concat(n[0].toUpperCase()).concat(n.slice(1)))})]}),(0,r.jsx)(f,{onClick:w,children:(0,r.jsx)(d.q5L,{className:"text-2xl"})})]}),(0,r.jsxs)("div",{id:"note-group",className:"mb-8 flex flex-col",children:[(0,r.jsx)("label",{htmlFor:"note",className:"mb-1 text-lg font-bold",children:"Note"}),(0,r.jsx)("input",{className:"rounded border border-neutral-100 bg-transparent text-lg font-bold tracking-wide",type:"text",name:"note",id:"note",value:j,onChange:function(e){return N(e.target.value)}})]}),(0,r.jsxs)("div",{id:"amount-group",className:"mb-4 flex flex-col",children:[(0,r.jsx)("label",{htmlFor:"amount",className:"mb-1 text-lg font-bold",children:"Amount"}),(0,r.jsx)("input",{ref:k,className:(0,u.m)("rounded border border-neutral-100 bg-transparent text-lg font-bold tracking-widest","income"===t&&"text-green-400","expense"===t&&"text-red-300"),type:"number",name:"amount",id:"amount",value:g||"",onChange:function(e){return b(Number(e.target.value))}})]}),(0,r.jsx)(f,{className:"shadow-common w-full rounded-2xl bg-sky-700 py-4 px-8 text-lg",onClick:function(){var e;!g&&0!==g||"hidden"===t||(c(t,g,j,m),w(),null===(e=k.current)||void 0===e||e.blur())},children:"Save"})]})})},b=function(e){var n=e.children,t=e.className;return(0,r.jsxs)("div",{className:(0,u.m)("h-screen w-screen overflow-x-hidden bg-neutral-700 text-gray-100",t),children:[(0,r.jsx)("header",{className:"flex h-14 items-center bg-neutral-600 bg-opacity-60 shadow-md",children:(0,r.jsx)("div",{className:"container mx-auto px-4",children:(0,r.jsx)("h1",{className:"text-xl font-bold",children:"Simple Budget"})})}),(0,r.jsx)("div",{className:"container mx-auto px-4 py-6",children:n})]})},h=function(e){return e.reduce((function(e,n){return e+n.amount}),0)},j={expense:[],income:[]},N=function(e){var n=e.itemData,t=e.itemType,i=e.isMenuVisible,o=e.onClick,c=e.onMoveUp,a=e.canMoveUp,s=e.onMoveDown,l=e.canMoveDown,x=e.onSetPin,m=e.onPressEdit,p=e.onPressDelete;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:(0,u.m)("pointer-events-none h-0 w-full rounded-t bg-black bg-opacity-25 opacity-0 transition-all duration-300","flex justify-evenly text-lg",i&&"pointer-events-auto h-10 opacity-100"),children:[(0,r.jsx)(f,{className:"grid flex-1 place-content-center disabled:text-neutral-500",disabled:!a,onClick:c,children:(0,r.jsx)(d.iRh,{})}),(0,r.jsx)(f,{className:"grid flex-1 place-content-center disabled:text-neutral-500",disabled:!l,onClick:s,children:(0,r.jsx)(d.tv1,{})}),(0,r.jsx)(f,{className:"grid flex-1 place-content-center disabled:text-neutral-500",onClick:x,children:(0,r.jsx)(d.i1c,{})}),(0,r.jsx)(f,{id:"adding-window-triggerer",className:"grid flex-1 place-content-center",onClick:m,children:(0,r.jsx)(d.vPQ,{})}),(0,r.jsx)(f,{className:"grid flex-1 place-content-center",onClick:p,children:(0,r.jsx)(d.Ybf,{})})]}),(0,r.jsxs)("div",{className:(0,u.m)("mb-0.5 flex w-full justify-between p-0.5 px-2 active:bg-black active:bg-opacity-10",i&&"bg-black bg-opacity-25"),onClick:function(){return o()},children:[(0,r.jsx)("p",{children:n.note}),(0,r.jsx)("p",{className:(0,u.m)("expense"===t&&"text-red-300","income"===t&&"text-green-400"),children:"".concat("expense"===t?"-":"+").concat(n.amount.toLocaleString("en-US",{maximumFractionDigits:2}))})]})]})},k=function(e){var n=e.itemData,t=e.itemType,i=e.isMenuVisible,o=e.onMoveUp,c=e.canMoveUp,a=e.onMoveDown,s=e.canMoveDown,l=e.onClick,x=e.onSetPin,m=e.onPressEdit;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:(0,u.m)("pointer-events-none h-0 w-full rounded-t bg-black bg-opacity-25 opacity-0 transition-all duration-300","flex justify-evenly text-lg",i&&"pointer-events-auto h-10 opacity-100"),children:[(0,r.jsx)(f,{className:"grid flex-1 place-content-center disabled:text-neutral-500",disabled:!c,onClick:o,children:(0,r.jsx)(d.iRh,{})}),(0,r.jsx)(f,{className:"grid flex-1 place-content-center disabled:text-neutral-500",disabled:!s,onClick:a,children:(0,r.jsx)(d.tv1,{})}),(0,r.jsx)(f,{className:"grid flex-1 place-content-center disabled:text-neutral-500",onClick:x,children:(0,r.jsx)(d.nlg,{})}),(0,r.jsx)(f,{id:"adding-window-triggerer",className:"grid flex-1 place-content-center",onClick:m,children:(0,r.jsx)(d.vPQ,{})})]}),(0,r.jsxs)("div",{className:(0,u.m)("mb-0.5 flex w-full justify-between p-0.5 px-2 font-semibold active:bg-black active:bg-opacity-10",i&&"bg-black bg-opacity-25"),onClick:function(){return l()},children:[(0,r.jsxs)("p",{className:"flex items-center gap-1",children:[(0,r.jsx)(d.i1c,{}),n.note]}),(0,r.jsx)("p",{className:(0,u.m)("expense"===t&&"text-red-300","income"===t&&"text-green-400"),children:"".concat("expense"===t?"-":"+").concat(n.amount.toLocaleString("en-US",{maximumFractionDigits:2}))})]})]})},w=function(e){var n=e.amount,t=e.itemType;return(0,r.jsxs)("div",{children:[(0,r.jsx)("hr",{className:"my-2"}),(0,r.jsxs)("div",{className:"flex w-full justify-between px-2",children:[(0,r.jsx)("p",{className:"font-bold",children:"Total:"}),(0,r.jsx)("p",{className:(0,u.m)("expense"===t&&"text-red-300","income"===t&&"text-green-400"),children:"".concat("expense"===t?"-":"+").concat(n.toLocaleString("en-US",{maximumFractionDigits:2}))})]})]})},y=function(e){var n=e.value;return(0,r.jsx)("div",{className:(0,u.m)("w-full rounded-2xl p-6 text-center text-xl font-bold tracking-wider shadow",n>0&&"bg-green-800 bg-opacity-30",0===n&&"bg-neutral-800 bg-opacity-30",n<0&&"bg-red-800 bg-opacity-30"),children:(0,r.jsx)("p",{children:"".concat(n>0?"+":"").concat(n.toLocaleString("en-US",{maximumFractionDigits:2}))})})},C=function(){var e=(0,a.Z)((0,x._)("simple-budget-data",j),2),n=e[0],t=e[1],d=(0,l.useState)(j),u=d[0],f=d[1],p=(0,l.useState)("hidden"),C=p[0],Z=p[1],M=(0,l.useState)(),D=M[0],P=M[1],S=(0,l.useState)(),E=(0,l.useState)(""),T=(0,l.useState)(),U=T[0],A=T[1],_=(0,a.Z)(S,2)[1],L=(0,a.Z)(E,2)[1],O=(0,l.useCallback)((function(e,n,a,r){t((function(t){var l={id:(0,m.Z)(),amount:n,note:a,isPinned:!1};if(r){var d=t[e].find((function(e){return e.id===r}));if(!d)return t;(l=d).id=r,l.amount=n,l.note=a;var u=h(t.income)-h(t.expense);return A(void 0),(0,c.Z)((0,o.Z)({},t),{diff:u})}var x=(0,c.Z)((0,o.Z)({},t),(0,i.Z)({},e,(0,s.Z)(t[e]).concat([l]))),f=h(x.income)-h(x.expense);return(0,c.Z)((0,o.Z)({},x),{diff:f})}))}),[t]),F=(0,l.useCallback)((function(e,n){t((function(t){var a=t[e].find((function(e){return e.id===n}));if(!a)return t;var r=t[e].indexOf(a),l=t[e][r-1];return(0,c.Z)((0,o.Z)({},t),(0,i.Z)({},e,(0,s.Z)(t[e].slice(0,r-1)).concat([a,l],(0,s.Z)(t[e].slice(r+1)))))}))}),[t]),R=(0,l.useCallback)((function(e,n){t((function(t){var a=t[e].find((function(e){return e.id===n}));if(!a)return t;var r=t[e].indexOf(a),l=t[e][r+1];return(0,c.Z)((0,o.Z)({},t),(0,i.Z)({},e,(0,s.Z)(t[e].slice(0,r)).concat([l,a],(0,s.Z)(t[e].slice(r+2)))))}))}),[t]),V=(0,l.useCallback)((function(e,n,i){t((function(t){var o=t[e].find((function(e){return e.id===n}));return o?(o.isPinned=i,t):t})),P(void 0)}),[t]),I=(0,l.useCallback)((function(e,n,a){confirm('Are you sure to delete "'.concat(a,'"?'))&&t((function(t){var a=t[e].find((function(e){return e.id===n}));if(!a)return t;var r=t[e].indexOf(a);return(0,c.Z)((0,o.Z)({},t),(0,i.Z)({},e,(0,s.Z)(t[e].slice(0,r)).concat((0,s.Z)(t[e].slice(r+1)))))}))}),[t]),H=(0,l.useCallback)((function(){confirm("Are you sure to clear all the unpinned data?")&&confirm("Are you REALLY REALLTY sure to clear all the unpinned data?")&&t((function(e){return(0,c.Z)((0,o.Z)({},e),{expense:e.expense.filter((function(e){return e.isPinned})),income:e.income.filter((function(e){return e.isPinned}))})}))}),[t]);return(0,l.useEffect)((function(){f(n)}),[n]),(0,r.jsxs)(b,{children:[(0,r.jsxs)("main",{children:[0===u.expense.length&&0===u.income.length&&"No record!",(0,r.jsxs)("section",{id:"render-data",className:"pb-14",children:[void 0!==(null===u||void 0===u?void 0:u.diff)&&(0,r.jsxs)("div",{id:"diff",className:"mb-6",children:[(0,r.jsx)("h2",{className:"mb-2 text-lg font-bold",children:"Diff"}),(0,r.jsx)(y,{value:u.diff})]}),u.expense.length>0&&(0,r.jsxs)("div",{id:"expense",className:"mb-6",children:[(0,r.jsx)("h2",{className:"mb-2 text-lg font-bold",children:"Expense"}),u.expense.map((function(e,n,t){return e.isPinned&&(0,r.jsx)(k,{itemType:"expense",itemData:e,isMenuVisible:D===e.id,onClick:function(){return P((function(n){return e.id!==n?e.id:void 0}))},canMoveUp:0!==n,onMoveUp:function(){F("expense",e.id)},canMoveDown:n!==t.length-1,onMoveDown:function(){R("expense",e.id)},onSetPin:function(){V("expense",e.id,!1)},onPressEdit:function(){A(e.id),_(e.amount),L(e.note),Z("expense")}},e.id)})),u.expense.map((function(e,n,t){return!e.isPinned&&(0,r.jsx)(N,{itemType:"expense",itemData:e,isMenuVisible:D===e.id,onClick:function(){return P((function(n){return e.id!==n?e.id:void 0}))},canMoveUp:0!==n,onMoveUp:function(){F("expense",e.id)},canMoveDown:n!==t.length-1,onMoveDown:function(){R("expense",e.id)},onSetPin:function(){V("expense",e.id,!0)},onPressEdit:function(){A(e.id),_(e.amount),L(e.note),Z("expense")},onPressDelete:function(){I("expense",e.id,e.note)}},e.id)})),(0,r.jsx)(w,{itemType:"expense",amount:h(u.expense)})]}),u.income.length>0&&(0,r.jsxs)("div",{id:"income",className:"mb-6",children:[(0,r.jsx)("h2",{className:"mb-2 text-lg font-bold",children:"Income"}),u.income.map((function(e,n,t){return e.isPinned&&(0,r.jsx)(k,{itemType:"income",itemData:e,isMenuVisible:D===e.id,onClick:function(){return P((function(n){return e.id!==n?e.id:void 0}))},canMoveUp:0!==n,onMoveUp:function(){F("income",e.id)},canMoveDown:n!==t.length-1,onMoveDown:function(){R("income",e.id)},onSetPin:function(){V("income",e.id,!1)},onPressEdit:function(){A(e.id),_(e.amount),L(e.note),Z("income")}},e.id)})),u.income.map((function(e,n,t){return!e.isPinned&&(0,r.jsx)(N,{itemType:"income",itemData:e,isMenuVisible:D===e.id,onClick:function(){return P((function(n){return e.id!==n?e.id:void 0}))},canMoveUp:0!==n,onMoveUp:function(){F("income",e.id)},canMoveDown:n!==t.length-1,onMoveDown:function(){R("income",e.id)},onSetPin:function(){V("income",e.id,!0)},onPressEdit:function(){A(e.id),_(e.amount),L(e.note),Z("income")},onPressDelete:function(){I("expense",e.id,e.note)}},e.id)})),(0,r.jsx)(w,{itemType:"income",amount:h(u.income)})]})]})]}),(0,r.jsxs)("section",{id:"control",children:[(0,r.jsx)(g,{addingType:C,amountHook:S,noteHook:E,onSave:O,onClose:function(){return Z("hidden")},editingId:U}),(0,r.jsx)(v,{onClickAdd:function(e){return Z(e)},onClickClearAll:H})]})]})}}},function(e){e.O(0,[489,774,888,179],(function(){return n=8312,e(e.s=n);var n}));var n=e.O();_N_E=n}]);