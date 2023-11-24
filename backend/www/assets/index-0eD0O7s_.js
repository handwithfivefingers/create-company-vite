import{r as g,j as d,F as C,I as M,B as T,c as Y,b as Q,m as S,d as X}from"./index-XD4JDM6b.js";import{C as Z}from"./index-akrSOs4w.js";import{A as k}from"./AdminMailService-Olk2g338.js";import{P as N}from"./index--frXZXQx.js";import{P as ee}from"./index-Rc3KqxQe.js";import{S as ne,M as te}from"./MoreOutlined-kX5gnkaD.js";import{T as j}from"./Table-UH30mYPz.js";import{F as re}from"./FormOutlined-lKW3anG1.js";import{D as ie}from"./DeleteOutlined-bNd3EvOf.js";import{D as oe}from"./index-LFWV8PwW.js";import"./index-ehUL30Ed.js";import"./index-gcWtjv3K.js";import"./dropdown-D6H3nMuz.js";var K={exports:{}},ae="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",se=ae,ce=se;function U(){}function $(){}$.resetWarningCache=U;var le=function(){function n(o,a,c,e,s,l){if(l!==ce){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}n.isRequired=n;function r(){return n}var i={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:r,element:n,elementType:n,instanceOf:r,node:n,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:$,resetWarningCache:U};return i.PropTypes=i,i};K.exports=le();var t=K.exports,D=function(){return D=Object.assign||function(n){for(var r,i=1,o=arguments.length;i<o;i++){r=arguments[i];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(n[a]=r[a])}return n},D.apply(this,arguments)},q={onActivate:t.func,onAddUndo:t.func,onBeforeAddUndo:t.func,onBeforeExecCommand:t.func,onBeforeGetContent:t.func,onBeforeRenderUI:t.func,onBeforeSetContent:t.func,onBeforePaste:t.func,onBlur:t.func,onChange:t.func,onClearUndos:t.func,onClick:t.func,onContextMenu:t.func,onCommentChange:t.func,onCopy:t.func,onCut:t.func,onDblclick:t.func,onDeactivate:t.func,onDirty:t.func,onDrag:t.func,onDragDrop:t.func,onDragEnd:t.func,onDragGesture:t.func,onDragOver:t.func,onDrop:t.func,onExecCommand:t.func,onFocus:t.func,onFocusIn:t.func,onFocusOut:t.func,onGetContent:t.func,onHide:t.func,onInit:t.func,onKeyDown:t.func,onKeyPress:t.func,onKeyUp:t.func,onLoadContent:t.func,onMouseDown:t.func,onMouseEnter:t.func,onMouseLeave:t.func,onMouseMove:t.func,onMouseOut:t.func,onMouseOver:t.func,onMouseUp:t.func,onNodeChange:t.func,onObjectResizeStart:t.func,onObjectResized:t.func,onObjectSelected:t.func,onPaste:t.func,onPostProcess:t.func,onPostRender:t.func,onPreProcess:t.func,onProgressState:t.func,onRedo:t.func,onRemove:t.func,onReset:t.func,onSaveContent:t.func,onSelectionChange:t.func,onSetAttrib:t.func,onSetContent:t.func,onShow:t.func,onSubmit:t.func,onUndo:t.func,onVisualAid:t.func,onSkinLoadError:t.func,onThemeLoadError:t.func,onModelLoadError:t.func,onPluginLoadError:t.func,onIconsLoadError:t.func,onLanguageLoadError:t.func,onScriptsLoad:t.func,onScriptsLoadError:t.func},ue=D({apiKey:t.string,id:t.string,inline:t.bool,init:t.object,initialValue:t.string,onEditorChange:t.func,value:t.string,tagName:t.string,cloudChannel:t.string,plugins:t.oneOfType([t.string,t.array]),toolbar:t.oneOfType([t.string,t.array]),disabled:t.bool,textareaName:t.string,tinymceScriptSrc:t.oneOfType([t.string,t.arrayOf(t.string),t.arrayOf(t.shape({src:t.string,async:t.bool,defer:t.bool}))]),rollback:t.oneOfType([t.number,t.oneOf([!1])]),scriptLoading:t.shape({async:t.bool,defer:t.bool,delay:t.number})},q),O=function(n){return typeof n=="function"},B=function(n){return n in q},F=function(n){return n.substr(2)},de=function(n,r,i,o,a,c,e){var s=Object.keys(a).filter(B),l=Object.keys(c).filter(B),u=s.filter(function(f){return c[f]===void 0}),h=l.filter(function(f){return a[f]===void 0});u.forEach(function(f){var v=F(f),_=e[v];i(v,_),delete e[v]}),h.forEach(function(f){var v=o(n,f),_=F(f);e[_]=v,r(_,v)})},fe=function(n,r,i,o,a){return de(a,n.on.bind(n),n.off.bind(n),function(c,e){return function(s){var l;return(l=c(e))===null||l===void 0?void 0:l(s,n)}},r,i,o)},A=0,G=function(n){var r=Date.now(),i=Math.floor(Math.random()*1e9);return A++,n+"_"+i+A+String(r)},z=function(n){return n!==null&&(n.tagName.toLowerCase()==="textarea"||n.tagName.toLowerCase()==="input")},H=function(n){return typeof n>"u"||n===""?[]:Array.isArray(n)?n:n.split(" ")},pe=function(n,r){return H(n).concat(H(r))},he=function(){return window.InputEvent&&typeof InputEvent.prototype.getTargetRanges=="function"},ve=function(n){if(!("isConnected"in Node.prototype)){for(var r=n,i=n.parentNode;i!=null;)r=i,i=r.parentNode;return r===n.ownerDocument}return n.isConnected},W=function(n,r){n!==void 0&&(n.mode!=null&&typeof n.mode=="object"&&typeof n.mode.set=="function"?n.mode.set(r):n.setMode(r))},P=function(){return P=Object.assign||function(n){for(var r,i=1,o=arguments.length;i<o;i++){r=arguments[i];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(n[a]=r[a])}return n},P.apply(this,arguments)},me=function(n,r,i){var o,a,c=n.createElement("script");c.referrerPolicy="origin",c.type="application/javascript",c.id=r.id,c.src=r.src,c.async=(o=r.async)!==null&&o!==void 0?o:!1,c.defer=(a=r.defer)!==null&&a!==void 0?a:!1;var e=function(){c.removeEventListener("load",e),c.removeEventListener("error",s),i(r.src)},s=function(l){c.removeEventListener("load",e),c.removeEventListener("error",s),i(r.src,l)};c.addEventListener("load",e),c.addEventListener("error",s),n.head&&n.head.appendChild(c)},ge=function(n){var r={},i=function(e,s){var l=r[e];l.done=!0,l.error=s;for(var u=0,h=l.handlers;u<h.length;u++){var f=h[u];f(e,s)}l.handlers=[]},o=function(e,s,l){var u=function(E){return l!==void 0?l(E):void 0};if(e.length===0){u(new Error("At least one script must be provided"));return}for(var h=0,f=!1,v=function(E,R){f||(R?(f=!0,u(R)):++h===e.length&&s())},_=0,p=e;_<p.length;_++){var m=p[_],y=r[m.src];if(y)y.done?v(m.src,y.error):y.handlers.push(v);else{var b=G("tiny-");r[m.src]={id:b,src:m.src,done:!1,error:null,handlers:[v]},me(n,P({id:b},m),i)}}},a=function(){for(var e,s=0,l=Object.values(r);s<l.length;s++){var u=l[s],h=n.getElementById(u.id);h!=null&&h.tagName==="SCRIPT"&&((e=h.parentNode)===null||e===void 0||e.removeChild(h))}r={}},c=function(){return n};return{loadScripts:o,deleteScripts:a,getDocument:c}},ye=function(){var n=[],r=function(a){var c=n.find(function(e){return e.getDocument()===a});return c===void 0&&(c=ge(a),n.push(c)),c},i=function(a,c,e,s,l){var u=function(){return r(a).loadScripts(c,s,l)};e>0?setTimeout(u,e):u()},o=function(){for(var a=n.pop();a!=null;a=n.pop())a.deleteScripts()};return{loadList:i,reinitialize:o}},_e=ye(),L=function(n){var r=n;return r&&r.tinymce?r.tinymce:null},be=function(){var n=function(r,i){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,a){o.__proto__=a}||function(o,a){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(o[c]=a[c])},n(r,i)};return function(r,i){if(typeof i!="function"&&i!==null)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");n(r,i);function o(){this.constructor=r}r.prototype=i===null?Object.create(i):(o.prototype=i.prototype,new o)}}(),I=function(){return I=Object.assign||function(n){for(var r,i=1,o=arguments.length;i<o;i++){r=arguments[i];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(n[a]=r[a])}return n},I.apply(this,arguments)},Ce=function(n){be(r,n);function r(i){var o,a,c,e=n.call(this,i)||this;return e.rollbackTimer=void 0,e.valueCursor=void 0,e.rollbackChange=function(){var s=e.editor,l=e.props.value;s&&l&&l!==e.currentContent&&s.undoManager.ignore(function(){if(s.setContent(l),e.valueCursor&&(!e.inline||s.hasFocus()))try{s.selection.moveToBookmark(e.valueCursor)}catch{}}),e.rollbackTimer=void 0},e.handleBeforeInput=function(s){if(e.props.value!==void 0&&e.props.value===e.currentContent&&e.editor&&(!e.inline||e.editor.hasFocus()))try{e.valueCursor=e.editor.selection.getBookmark(3)}catch{}},e.handleBeforeInputSpecial=function(s){(s.key==="Enter"||s.key==="Backspace"||s.key==="Delete")&&e.handleBeforeInput(s)},e.handleEditorChange=function(s){var l=e.editor;if(l&&l.initialized){var u=l.getContent();e.props.value!==void 0&&e.props.value!==u&&e.props.rollback!==!1&&(e.rollbackTimer||(e.rollbackTimer=window.setTimeout(e.rollbackChange,typeof e.props.rollback=="number"?e.props.rollback:200))),u!==e.currentContent&&(e.currentContent=u,O(e.props.onEditorChange)&&e.props.onEditorChange(u,l))}},e.handleEditorChangeSpecial=function(s){(s.key==="Backspace"||s.key==="Delete")&&e.handleEditorChange(s)},e.initialise=function(s){var l,u,h;s===void 0&&(s=0);var f=e.elementRef.current;if(f){if(!ve(f)){if(s===0)setTimeout(function(){return e.initialise(1)},1);else if(s<100)setTimeout(function(){return e.initialise(s+1)},100);else throw new Error("tinymce can only be initialised when in a document");return}var v=L(e.view);if(!v)throw new Error("tinymce should have been loaded into global scope");var _=I(I({},e.props.init),{selector:void 0,target:f,readonly:e.props.disabled,inline:e.inline,plugins:pe((l=e.props.init)===null||l===void 0?void 0:l.plugins,e.props.plugins),toolbar:(u=e.props.toolbar)!==null&&u!==void 0?u:(h=e.props.init)===null||h===void 0?void 0:h.toolbar,setup:function(p){e.editor=p,e.bindHandlers({}),e.inline&&!z(f)&&p.once("PostRender",function(m){p.setContent(e.getInitialValue(),{no_events:!0})}),e.props.init&&O(e.props.init.setup)&&e.props.init.setup(p)},init_instance_callback:function(p){var m,y,b=e.getInitialValue();e.currentContent=(m=e.currentContent)!==null&&m!==void 0?m:p.getContent(),e.currentContent!==b&&(e.currentContent=b,p.setContent(b),p.undoManager.clear(),p.undoManager.add(),p.setDirty(!1));var E=(y=e.props.disabled)!==null&&y!==void 0?y:!1;W(e.editor,E?"readonly":"design"),e.props.init&&O(e.props.init.init_instance_callback)&&e.props.init.init_instance_callback(p)}});e.inline||(f.style.visibility=""),z(f)&&(f.value=e.getInitialValue()),v.init(_)}},e.id=e.props.id||G("tiny-react"),e.elementRef=g.createRef(),e.inline=(c=(o=e.props.inline)!==null&&o!==void 0?o:(a=e.props.init)===null||a===void 0?void 0:a.inline)!==null&&c!==void 0?c:!1,e.boundHandlers={},e}return Object.defineProperty(r.prototype,"view",{get:function(){var i,o;return(o=(i=this.elementRef.current)===null||i===void 0?void 0:i.ownerDocument.defaultView)!==null&&o!==void 0?o:window},enumerable:!1,configurable:!0}),r.prototype.componentDidUpdate=function(i){var o=this,a,c;if(this.rollbackTimer&&(clearTimeout(this.rollbackTimer),this.rollbackTimer=void 0),this.editor&&(this.bindHandlers(i),this.editor.initialized)){if(this.currentContent=(a=this.currentContent)!==null&&a!==void 0?a:this.editor.getContent(),typeof this.props.initialValue=="string"&&this.props.initialValue!==i.initialValue)this.editor.setContent(this.props.initialValue),this.editor.undoManager.clear(),this.editor.undoManager.add(),this.editor.setDirty(!1);else if(typeof this.props.value=="string"&&this.props.value!==this.currentContent){var e=this.editor;e.undoManager.transact(function(){var l;if(!o.inline||e.hasFocus())try{l=e.selection.getBookmark(3)}catch{}var u=o.valueCursor;if(e.setContent(o.props.value),!o.inline||e.hasFocus())for(var h=0,f=[l,u];h<f.length;h++){var v=f[h];if(v)try{e.selection.moveToBookmark(v),o.valueCursor=v;break}catch{}}})}if(this.props.disabled!==i.disabled){var s=(c=this.props.disabled)!==null&&c!==void 0?c:!1;W(this.editor,s?"readonly":"design")}}},r.prototype.componentDidMount=function(){var i=this,o,a,c,e,s;if(L(this.view)!==null)this.initialise();else if(Array.isArray(this.props.tinymceScriptSrc)&&this.props.tinymceScriptSrc.length===0)(a=(o=this.props).onScriptsLoadError)===null||a===void 0||a.call(o,new Error("No `tinymce` global is present but the `tinymceScriptSrc` prop was an empty array."));else if(!((c=this.elementRef.current)===null||c===void 0)&&c.ownerDocument){var l=function(){var h,f;(f=(h=i.props).onScriptsLoad)===null||f===void 0||f.call(h),i.initialise()},u=function(h){var f,v;(v=(f=i.props).onScriptsLoadError)===null||v===void 0||v.call(f,h)};_e.loadList(this.elementRef.current.ownerDocument,this.getScriptSources(),(s=(e=this.props.scriptLoading)===null||e===void 0?void 0:e.delay)!==null&&s!==void 0?s:0,l,u)}},r.prototype.componentWillUnmount=function(){var i=this,o=this.editor;o&&(o.off(this.changeEvents(),this.handleEditorChange),o.off(this.beforeInputEvent(),this.handleBeforeInput),o.off("keypress",this.handleEditorChangeSpecial),o.off("keydown",this.handleBeforeInputSpecial),o.off("NewBlock",this.handleEditorChange),Object.keys(this.boundHandlers).forEach(function(a){o.off(a,i.boundHandlers[a])}),this.boundHandlers={},o.remove(),this.editor=void 0)},r.prototype.render=function(){return this.inline?this.renderInline():this.renderIframe()},r.prototype.changeEvents=function(){var i,o,a,c=(a=(o=(i=L(this.view))===null||i===void 0?void 0:i.Env)===null||o===void 0?void 0:o.browser)===null||a===void 0?void 0:a.isIE();return c?"change keyup compositionend setcontent CommentChange":"change input compositionend setcontent CommentChange"},r.prototype.beforeInputEvent=function(){return he()?"beforeinput SelectionChange":"SelectionChange"},r.prototype.renderInline=function(){var i=this.props.tagName,o=i===void 0?"div":i;return g.createElement(o,{ref:this.elementRef,id:this.id})},r.prototype.renderIframe=function(){return g.createElement("textarea",{ref:this.elementRef,style:{visibility:"hidden"},name:this.props.textareaName,id:this.id})},r.prototype.getScriptSources=function(){var i,o,a=(i=this.props.scriptLoading)===null||i===void 0?void 0:i.async,c=(o=this.props.scriptLoading)===null||o===void 0?void 0:o.defer;if(this.props.tinymceScriptSrc!==void 0)return typeof this.props.tinymceScriptSrc=="string"?[{src:this.props.tinymceScriptSrc,async:a,defer:c}]:this.props.tinymceScriptSrc.map(function(u){return typeof u=="string"?{src:u,async:a,defer:c}:u});var e=this.props.cloudChannel,s=this.props.apiKey?this.props.apiKey:"no-api-key",l="https://cdn.tiny.cloud/1/".concat(s,"/tinymce/").concat(e,"/tinymce.min.js");return[{src:l,async:a,defer:c}]},r.prototype.getInitialValue=function(){return typeof this.props.initialValue=="string"?this.props.initialValue:typeof this.props.value=="string"?this.props.value:""},r.prototype.bindHandlers=function(i){var o=this;if(this.editor!==void 0){fe(this.editor,i,this.props,this.boundHandlers,function(s){return o.props[s]});var a=function(s){return s.onEditorChange!==void 0||s.value!==void 0},c=a(i),e=a(this.props);!c&&e?(this.editor.on(this.changeEvents(),this.handleEditorChange),this.editor.on(this.beforeInputEvent(),this.handleBeforeInput),this.editor.on("keydown",this.handleBeforeInputSpecial),this.editor.on("keyup",this.handleEditorChangeSpecial),this.editor.on("NewBlock",this.handleEditorChange)):c&&!e&&(this.editor.off(this.changeEvents(),this.handleEditorChange),this.editor.off(this.beforeInputEvent(),this.handleBeforeInput),this.editor.off("keydown",this.handleBeforeInputSpecial),this.editor.off("keyup",this.handleEditorChangeSpecial),this.editor.off("NewBlock",this.handleEditorChange))}},r.propTypes=ue,r.defaultProps={cloudChannel:"6"},r}(g.Component);const Se="_inline_rp91m_78",Ee="_box__shadow_rp91m_139",je="_active_rp91m_150",xe="_editor_rp91m_150",we="_heading_rp91m_150",Te="_editorContent_rp91m_159",ke="_disabled_rp91m_235",Ie={"ant-table-scroll-horizontal":"_ant-table-scroll-horizontal_rp91m_1","ant-table-container":"_ant-table-container_rp91m_1","ant-table-content":"_ant-table-content_rp91m_1","ant-layout-sider-trigger":"_ant-layout-sider-trigger_rp91m_24","ant-layout-footer":"_ant-layout-footer_rp91m_29","ant-form-item-control-input-content":"_ant-form-item-control-input-content_rp91m_33","ant-picker":"_ant-picker_rp91m_48","ant-select-selector":"_ant-select-selector_rp91m_49","ant-form-item":"_ant-form-item_rp91m_33","ant-row":"_ant-row_rp91m_62","site-layout-background":"_site-layout-background_rp91m_66","spin-suspense":"_spin-suspense_rp91m_70",inline:Se,"cc-scroll":"_cc-scroll_rp91m_90","cc-card":"_cc-card_rp91m_114",box__shadow:Ee,"ant-tabs-content-holder":"_ant-tabs-content-holder_rp91m_143","ant-tabs-content":"_ant-tabs-content_rp91m_143",active:je,editor:xe,heading:we,editorContent:Te,disabled:ke},J=g.forwardRef(({value:n,onChange:r},i)=>{const o=g.useRef(null);return g.useImperativeHandle(i,()=>({getContent:a=>{var c;return(c=o.current)==null?void 0:c.getContent(a)}}),[o]),d.jsx("div",{className:Ie.editor,children:d.jsx(Ce,{id:"editor-tinymce",tinymceScriptSrc:"/tinymce/tinymce.min.js",onInit:(a,c)=>o.current=c,initialValue:n,init:{height:500,menubar:!1,plugins:["advlist","autolink","lists","link","image","charmap","anchor","searchreplace","visualblocks","code","fullscreen","insertdatetime","media","table","preview","help","wordcount"],toolbar:"tableundo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"},onChange:r})})});J.displayName="CCEditor";const Oe="_mail_t4y4a_1",Le="_header_t4y4a_9",De="_title_t4y4a_16",Pe="_action_t4y4a_20",Re="_loading_t4y4a_28",Me="_loadingActive_t4y4a_33",x={mail:Oe,header:Le,title:De,action:Pe,loading:Re,loadingActive:Me},Ne=n=>{const[r,i]=g.useState(!1),o=g.useRef(),[a]=C.useForm();g.useEffect(()=>{var e,s,l;n.data?a.setFieldsValue({name:(e=n==null?void 0:n.data)==null?void 0:e.name,subject:(s=n==null?void 0:n.data)==null?void 0:s.subject,content:(l=n==null?void 0:n.data)==null?void 0:l.content}):a.resetFields()},[n]);const c=async({name:e,subject:s})=>{try{i(!0);const l=o.current.getContent(),u={name:e,subject:s,content:l};if(u.name.length<=1||u.content.length<=1)return;if(n.type===1){const h=await k.addTemplate(u);S.error(h.data.message)}else if(n.type===2){const h=await k.editTemplate({_id:n.data._id,...u});S.success(h.data.message)}}catch(l){S.error(l)}finally{n.onFinishScreen&&n.onFinishScreen(),i(!1)}};return d.jsx("div",{className:x.mail,children:d.jsxs(C,{form:a,layout:"vertical",onFinish:c,children:[d.jsx(C.Item,{label:"Tiêu đề",name:"name",children:d.jsx(M,{size:"middle"})}),d.jsx(C.Item,{label:"Tên mail",name:"subject",children:d.jsx(M,{size:"middle"})}),d.jsx(C.Item,{name:"content",label:"Nội dung",children:d.jsx(J,{ref:o})}),d.jsx(C.Item,{children:d.jsx(T,{htmlType:"submit",className:x.submit,children:"Submit"})}),d.jsx("div",{className:Y([x.loading],{[x.loadingActive]:r}),children:d.jsx(Q,{spinning:r})})]})})},V=g.memo(Ne),Be="_mail_ahob1_1",Fe="_header_ahob1_8",Ae="_title_ahob1_18",ze="_action_ahob1_22",He="_tableContent_ahob1_26",We="_popover_ahob1_42",Ve="_headerWrapper_ahob1_66",Ke="_tableWrapper_ahob1_73",Ue="_pagination_ahob1_86",$e="_contentWrapper_ahob1_92",w={mail:Be,header:Fe,title:Ae,action:ze,tableContent:He,popover:We,headerWrapper:Ve,tableWrapper:Ke,pagination:Ue,contentWrapper:$e};function qe(){const[n,r]=g.useState([]),[i,o]=g.useState(!1),[a,c]=g.useState(1),[e,s]=g.useState({title:"",visible:!1,component:null,width:0}),l=async(p=1)=>{try{let m={page:p};o(!0);let y=await k.getTemplate(m);y.data.status===200?r(y.data.data):S.error(y.data.message)}catch{}finally{o(!1)}};g.useEffect(()=>{l()},[]);const u=()=>{s({...e,title:"Thêm mẫu mới",visible:!0,width:"500px",component:d.jsx(V,{onClose:f,type:1,onFinishScreen:()=>{f(),l()}})})},h=p=>{s({...e,title:"Chỉnh sửa mẫu",visible:!0,width:"500px",component:d.jsx(V,{data:p,content:p.content,onClose:f,type:2,onFinishScreen:()=>{f(),l()}})})},f=()=>{s({...e,visible:!1})},v=async p=>{o(!0);try{let m=await k.deleteTemplate(p._id);m.data.status===200&&S.success(m.data.message)}catch{}finally{o(!1),l()}},_={current:n.current_page,pageSize:10,total:n.count,onChange:(p,m)=>{l(p)},showSizeChanger:!1};return d.jsxs(d.Fragment,{children:[d.jsxs("div",{className:w.headerWrapper,children:[a===1&&d.jsx(N,{title:"Template Mail",style:{padding:"16px 0"}}),a===2&&d.jsx(N,{title:d.jsxs(T,{type:"text",onClick:()=>u(),style:{background:"#fff",display:"flex",alignItems:"center"},children:[d.jsx(ee,{})," Thêm mới"]},"add-template"),style:{padding:"16px 0"}}),d.jsx(ne,{options:[{value:1,icon:d.jsx(X,{})},{value:2,icon:d.jsx(te,{})}],defaultValue:a,onChange:p=>c(p)})]}),d.jsxs("div",{className:w.contentWrapper,children:[d.jsx("div",{className:w.tableWrapper,children:d.jsxs(j,{size:"small",bordered:!0,dataSource:n._template,loading:{spinning:i,tip:"Loading...",delay:100},pagination:!1,rowKey:p=>p._id,children:[d.jsx(j.Column,{width:"40%",title:"Mẫu Email",dataIndex:"name",render:(p,m,y)=>p}),d.jsx(j.Column,{width:"60%",title:"Subject",dataIndex:"subject",render:(p,m,y)=>p}),d.jsx(j.Column,{width:"80px",title:"Action",render:(p,m,y)=>d.jsxs("span",{style:{display:"inline-block",width:80},children:[d.jsx(T,{type:"primary",size:"small",onClick:()=>h(m),children:d.jsx(re,{})}),d.jsx(T,{type:"text",size:"small",onClick:()=>v(m),children:d.jsx(ie,{})})]})})]})}),d.jsx("div",{className:w.pagination,children:d.jsx(Z,{..._})}),d.jsx(oe,{title:e.title,width:720,onClose:f,visible:e.visible,children:e.component})]})]})}const cn=g.memo(qe);export{cn as default};