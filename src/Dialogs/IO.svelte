<script>
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Button, { Label } from "@smui/button";
    import TextField from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text";

    import { data } from "../data";

    export let open = false;
    let tmp;
    $: if(!open && tmp!==JSON.stringify($data)) tmp = JSON.stringify($data);
    function save() {
        open = false;
        data.set(JSON.parse(tmp));
    }
</script>

    <Dialog scrimClickAction="" escapeKeyAction="" bind:open>
        <Title>导出/导入数据</Title>
        <Content>
            <div style="margin: 0.5em 0">
                <TextField
                    style="width: 100%;"
                    helperLine$style="width: 100%;"
                    textarea
                    bind:value={tmp}
                    label="序列化数据"
                >
                    <HelperText slot="helper">
                        若要导出，复制文本框内容。若要导入，粘贴至文本框后保存。
                        </HelperText
                    >
                </TextField>
            </div>
        </Content>
        <Actions>
            <Button on:click={save}>
                <Label>SAVE</Label>
            </Button>
        </Actions>
    </Dialog>