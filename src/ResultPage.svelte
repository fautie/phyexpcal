<script lang="ts">
import { Content, Title } from "@smui/paper";
import Paper from "@smui/paper/Paper.svelte";
import Calculator from "./Misc";
import katex from "katex";
export let render;
</script>

<Paper>
{#if render}
<Title>报告</Title>
<Content>
{@html katex.renderToString(render.SINGLE.map((_,i)=>Calculator.calculateSingle(i,render).fullLatexForm).join("\\\\"),{displayMode:true,fleqn:true})}
{@html katex.renderToString(render.MULTI.map((_,i)=>Calculator.calculateMulti(i,render).fullLatexForm).join("\\\\"),{displayMode:true,fleqn:true})}
{@html katex.renderToString(render.CONSTANT.map((_,i)=>Calculator.calculateConstant(i,render).latexForm).join("\\\\"),{displayMode:true,fleqn:true})}
{@html katex.renderToString(render.FORMULA.map((_,i)=>Calculator.calculateFormula(i,render).fullLatexForm).join("\\\\"),{displayMode:true,fleqn:true})}
请自行修正保留小数位。
</Content>
{/if}
</Paper>
