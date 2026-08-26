const products={1:{name:"Método Mãe que Vence",price:29.90}};let cart=JSON.parse(localStorage.getItem("mqv-cart")||"[]");
const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function save(){localStorage.setItem("mqv-cart",JSON.stringify(cart));render()}
function add(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function change(d){if(!cart.length)return;cart[0].qty+=d;if(cart[0].qty<=0)cart=[];save()}
function render(){const n=cart.reduce((s,x)=>s+x.qty,0);document.getElementById("count").textContent=n;
let box=document.getElementById("items");if(!cart.length){box.innerHTML="<p>Seu carrinho está vazio.</p>";document.getElementById("total").textContent=money(0);return}
let x=cart[0],p=products[x.id];box.innerHTML=`<div class="row"><div><b>${p.name}</b><br>${money(p.price)}<div class="qty"><button onclick="change(-1)">−</button> ${x.qty} <button onclick="change(1)">+</button></div></div><b>${money(p.price*x.qty)}</b></div>`;
document.getElementById("total").textContent=money(p.price*x.qty)}
function openCart(){cartEl.classList.add("open");overlay.classList.add("open")}function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("open")}
const cartEl=document.getElementById("cart"),overlay=document.getElementById("overlay"),modal=document.getElementById("modal");
document.getElementById("openCart").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;overlay.onclick=closeCart;
document.getElementById("checkout").onclick=()=>{if(!cart.length)return alert("Adicione o Método Mãe que Vence ao carrinho.");document.getElementById("summary").innerHTML=`<p><b>${cart[0].qty}x Método Mãe que Vence</b> — ${money(products[1].price*cart[0].qty)}</p>`;closeCart();modal.classList.add("show")};
document.getElementById("closeModal").onclick=()=>modal.classList.remove("show");
document.getElementById("form").onsubmit=e=>{e.preventDefault();alert("Checkout de demonstração. Conecte aqui Mercado Pago, Stripe, Hotmart ou Kiwify antes de publicar.");};
render();