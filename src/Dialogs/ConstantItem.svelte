<script>
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Button, { Label } from "@smui/button";
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import TextField from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text";

    import { data } from "../data";
    import Calculator from "../Misc";

    export let open = false;
    export let pointer = null;
    let tmp;
    $: if (pointer !== null) {
        tmp = $data.CONSTANT[pointer];
    }
    function save() {
        pointer = null;
        open = false;
        $data.CONSTANT[pointer] = tmp;
    }
    function del() {
        Calculator.removeConstantItem(pointer);
        pointer = null;
        open = false;
    }
</script>

{#if pointer !== null}
    <Dialog scrimClickAction="" escapeKeyAction="" bind:open>
        <Title>录入一个常数</Title>
        <Content>
            <LayoutGrid>
                <Cell span={6}>
                    <TextField bind:value={tmp.symbol} label="符号">
                        <HelperText slot="helper">例如<code>g</code></HelperText
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
                    <TextField bind:value={tmp.value} prefix={tmp.symbol+"="} suffix={tmp.unit} type="number" label="值">
                        <HelperText slot="helper"
                            >例如<code>9.8</code></HelperText
                        >
                    </TextField>
                </Cell>
            </LayoutGrid>
        </Content>
        <Actions>
            <Button on:click={del}>
                <Label>DELETE ITEM</Label>
            </Button>
            <Button on:click={save}>
                <Label>SAVE</Label>
            </Button>
        </Actions>
    </Dialog>
{/if}
