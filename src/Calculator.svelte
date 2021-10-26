<script lang="ts">
    import Paper, { Title, Subtitle, Content } from "@smui/paper";
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import Button from "@smui/button";
    import SingleItem from "./Dialogs/SingleItem.svelte";
    import MultiItem from "./Dialogs/MultiItem.svelte";
    import ConstantItem from "./Dialogs/ConstantItem.svelte";
    import Formula from "./Dialogs/Formula.svelte";
    import Donate from "./Dialogs/Donate.svelte";
    import Fab, { Icon } from "@smui/fab";
    import List, { Item, Text, Meta } from "@smui/list";
    import Calculator from "./Misc";
    import { data } from "./data";
    import IconButton from "@smui/icon-button";
    import katex from "katex";
    import Io from "./Dialogs/IO.svelte";
    let single = { opened: false, pointer: null };
    let multi = { opened: false, pointer: null };
    let constant = { opened: false, pointer: null };
    let formula = { opened: false, pointer: null };
    let donate = false;
    let io = false;
    let selectedIndex = null;
</script>

<div class="paper-container">
    <Paper class="calc">
        <Title>不确定度计算器</Title>
        <Subtitle>HFUT制式</Subtitle>
        <Content>
            <!-- 录入按钮 -->
            <LayoutGrid>
                <Cell span={2}>
                    <Button
                        on:click={() => {
                            single = {
                                opened: true,
                                pointer: Calculator.createSingleItem(),
                            };
                        }}>录入一项数据</Button
                    >
                </Cell>
                <Cell span={2}>
                    <Button
                        on:click={() => {
                            multi = {
                                opened: true,
                                pointer: Calculator.createMultiItem(),
                            };
                        }}>录入一组数据</Button
                    >
                </Cell>
                <Cell span={2}>
                    <Button
                        on:click={() => {
                            constant = {
                                opened: true,
                                pointer: Calculator.createConstantItem(),
                            };
                        }}>录入常数</Button
                    >
                </Cell>
                <Cell span={2}>
                    <Button
                        on:click={() => {
                            formula = {
                                opened: true,
                                pointer: Calculator.createFormulaItem(),
                            };
                        }}>录入公式</Button
                    >
                </Cell>
                <Cell span={2}>
                    <Button
                        on:click={() => {
                            io = true;
                        }}>导出/入数据</Button
                    >
                </Cell>
            </LayoutGrid>
            <!-- 展示与修改 -->
            <List bind:selectedIndex nonInteractive>
                {#each $data.SINGLE as _, i}
                    {#if $data.SINGLE[i].value}
                        <Item>
                            <Text>
                                {@html katex.renderToString(
                                    Calculator.calculateSingle(i, $data)
                                        .latexForm
                                )}
                            </Text>
                            <Meta>
                                <IconButton
                                    class="material-icons"
                                    on:click={() => {
                                        single = { opened: true, pointer: i };
                                    }}
                                >
                                    edit
                                </IconButton>
                                <IconButton
                                    class="material-icons"
                                    on:click={() => {
                                        Calculator.removeSingleItem(i);
                                    }}
                                >
                                    delete
                                </IconButton>
                            </Meta>
                        </Item>
                    {/if}
                {/each}
                {#each $data.MULTI as _, i}
                    {#if $data.MULTI[i].len}
                        <Item>
                            <Text>
                                {@html katex.renderToString(
                                    Calculator.calculateMulti(i, $data)
                                        .latexForm
                                )}
                            </Text>
                            <Meta>
                                <IconButton
                                    class="material-icons"
                                    on:click={() => {
                                        multi = { opened: true, pointer: i };
                                    }}
                                >
                                    edit
                                </IconButton>
                                <IconButton
                                    class="material-icons"
                                    on:click={() => {
                                        Calculator.removeMultiItem(i);
                                    }}
                                >
                                    delete
                                </IconButton>
                            </Meta>
                        </Item>
                    {/if}
                {/each}
                {#each $data.CONSTANT as _, i}
                    {#if $data.CONSTANT[i].value}
                        <Item>
                            <Text>
                                {@html katex.renderToString(
                                    Calculator.calculateConstant(i, $data)
                                        .latexForm
                                )}
                            </Text>
                            <Meta>
                                <IconButton
                                    class="material-icons"
                                    on:click={() => {
                                        constant = { opened: true, pointer: i };
                                    }}
                                >
                                    edit
                                </IconButton>
                                <IconButton
                                    class="material-icons"
                                    on:click={() => {
                                        Calculator.removeConstantItem(i);
                                    }}
                                >
                                    delete
                                </IconButton>
                            </Meta>
                        </Item>
                    {/if}
                {/each}
                {#each $data.FORMULA as _, i}
                    {#if $data.FORMULA[i].value}
                        <Item>
                            <Text>
                                {@html katex.renderToString(
                                    Calculator.calculateFormula(i, $data)
                                        .latexForm
                                )}
                            </Text>
                            <Meta>
                                <IconButton
                                    class="material-icons"
                                    on:click={() => {
                                        formula = { opened: true, pointer: i };
                                    }}
                                >
                                    edit
                                </IconButton>
                                <IconButton
                                    class="material-icons"
                                    on:click={() => {
                                        Calculator.removeFormulaItem(i);
                                    }}
                                >
                                    delete
                                </IconButton>
                            </Meta>
                        </Item>
                    {/if}
                {/each}
            </List>
        </Content>
    </Paper>
</div>
<div style="position: absolute;bottom:1em;right:1em;">
    <Fab on:click={() => (donate = !donate)}>
        <Icon class="material-icons">request_quote</Icon>
    </Fab>
</div>

<SingleItem bind:open={single.opened} bind:pointer={single.pointer} />
<MultiItem bind:open={multi.opened} bind:pointer={multi.pointer} />
<ConstantItem bind:open={constant.opened} bind:pointer={constant.pointer} />
<Formula bind:open={formula.opened} bind:pointer={formula.pointer} />
<Donate bind:open={donate} />
<Io bind:open={io} />

<style>
    * :global(.calc) {
        margin: 0 auto;
        max-width: 70vw;
    }
</style>
