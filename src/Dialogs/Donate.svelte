<script>
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Button, { Label } from "@smui/button";
    export let open = false;
</script>

<Dialog bind:open>
    <Title>赛博乞讨</Title>
    <Content>
        <p>老爷行行好捐点饭钱吧</p>
        <img style="width:100%;" src="/reward.png" alt="打钱码">
    </Content>
    <Actions>
        <Button>
            <Label>Exit</Label>
        </Button>
    </Actions>
</Dialog>
