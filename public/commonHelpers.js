import{C as d,S as m,N as f,P as p}from"./assets/vendor-D7AHEJkU.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const g=document.querySelector(".js-choise"),l=document.querySelector(".icon-menu"),c=document.querySelector(".header-actions"),r=document.querySelectorAll(".list-menu-item");new d(g,{searchEnabled:!1,itemSelectText:""});new m(".hero-swiper",{modules:[f,p],loop:!0,pagination:{el:".swiper-pagination",clickable:!0}});const u=()=>{l.classList.toggle("menu-open"),c.classList.toggle("menu-open"),c.classList.contains("menu-open")?(r[0].classList.add("_active"),i()):(i(),r[0].classList.remove("_active"))},i=()=>{document.body.classList.toggle("lock")};l.addEventListener("click",u);r[0].addEventListener("click",u);
//# sourceMappingURL=commonHelpers.js.map