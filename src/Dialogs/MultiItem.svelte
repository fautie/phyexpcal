<script lang="ts">
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Button, { Label } from "@smui/button";
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import TextField from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text";

    import { data } from "../data";
    import Calculator from "../Misc";

    export let open = false;
    export let pointer = null;
    let next = false;
    let tmp: MULTI | null;
    $: if (pointer !== null) {
        tmp = $data.MULTI[pointer];
    }
    function save() {
        pointer = null;
        next = false;
        $data.MULTI[pointer] = tmp;
    }
    function nex() {
        next = true;
        open = false;
        tmp.values.length = tmp.len;
        for (let i = 0; i < tmp.len; i++)
            if (tmp.values[i] === undefined) tmp.values[i] = 0;
    }
    function prev() {
        next = false;
        open = true;
    }
    function del() {
        Calculator.removeMultiItem(pointer);
        pointer = null;
        open = false;
    }
</script>

{#if pointer !== null}
    <Dialog scrimClickAction="" escapeKeyAction="" bind:open>
        <Title>录入一组数据</Title>
        <Content>
            <LayoutGrid>
                <Cell span={6}>
                    <TextField bind:value={tmp.symbol} label="符号">
                        <HelperText slot="helper">例如<code>a</code></HelperText
                        >
                    </TextField>
                </Cell>
                <Cell span={6}>
                    <TextField bind:value={tmp.unit} label="单位">
                        <HelperText slot="helper"
                            >例如<code>m/s^2</code></HelperText
                        >
                    </TextField>
                </Cell>
                <Cell span={6}>
                    <TextField
                        bind:value={tmp.len}
                        type="number"
                        label="组数"
                        min="0"
                    >
                        <HelperText slot="helper">例如<code>3</code></HelperText
                        >
                    </TextField>
                </Cell>
                <Cell span={6}>
                    <TextField
                        bind:value={tmp.grad}
                        suffix={tmp.unit}
                        type="number"
                        label="最小刻度"
                    >
                        <HelperText slot="helper"
                            >例如<code>0.1</code></HelperText
                        >
                    </TextField>
                </Cell>
            </LayoutGrid>
        </Content>
        <Actions>
            <Button on:click={del}>
                <Label>DELETE ITEM</Label>
            </Button>
            <Button disabled={tmp.len<0||tmp.len!==(tmp.len|0)} on:click={nex}>
                <Label>Next</Label>
            </Button>
        </Actions>
    </Dialog>
    {#if next}
    <Dialog bind:open={next}>
        <Title>录入</Title>
        <Content>
            {#each Array(tmp.len) as _, index}
                <TextField
                    style="width:100%"
                    bind:value={tmp.values[index]}
                    label="值 {index + 1}"
                    prefix={tmp.symbol + "_" + (index + 1)+"="}
                    suffix={tmp.unit}
                    type="number"
                />
            {/each}
        </Content>
        <Actions>
            <Button on:click={prev}>
                <Label>PREV</Label>
            </Button>
            <Button on:click={save}>
                <Label>SAVE</Label>
            </Button>
        </Actions>
    </Dialog>
    {/if}
{/if}
