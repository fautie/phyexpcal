<script>
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Button, { Label } from "@smui/button";
    import TextField from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text";

    import { data } from "../data";
    import Calculator from "../Misc";

    export let open = false;
    export let pointer = null;
    let tmp;
    $: if (pointer !== null) {
        tmp = $data.FORMULA[pointer];
    }
    function save() {
        pointer = null;
        open = false;
        $data.FORMULA[pointer] = tmp;
    }
    function del() {
        Calculator.removeFormulaItem(pointer);
        pointer = null;
        open = false;
    }
</script>

{#if pointer !== null}
    <Dialog scrimClickAction="" escapeKeyAction="" bind:open>
        <Title>录入一项公式</Title>
        <Content>
            <div style="margin: 0.5em 0">
                <TextField
                    style="width: 100%;"
                    helperLine$style="width: 100%;"
                    textarea
                    bind:value={tmp.value}
                    label="公式"
                >
                    <HelperText slot="helper"
                        >例如<code>T=m*a/f+cos(t)</code>。请注意，<code
                            >`*`</code
                        >不能省略。输入完成后请点击<code>Check</code
                        >以检查是否被识别。</HelperText
                    >
                </TextField>
            </div>
        </Content>
        <Actions>
            <Button on:click={() => 0}>
                <Label>Check</Label>
            </Button>
            <Button on:click={del}>
                <Label>DELETE ITEM</Label>
            </Button>
            <Button on:click={save}>
                <Label>SAVE</Label>
            </Button>
        </Actions>
    </Dialog>
{/if}
