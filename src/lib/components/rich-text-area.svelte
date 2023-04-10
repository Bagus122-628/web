<script>
  import Editor from '@tinymce/tinymce-svelte';

  $: value = 'additional information';

  let conf = {
    height: 360,
    menubar: false,
    plugins: `advlist autolink lists link image charmap  preview anchor searchreplace visualblocks visualchars code fullscreen table insertdatetime media table  code help wordcount`,
    toolbar: `undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table |"removeformat | help`,
    content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:12px }`
  };
</script>

<main>
  <Editor {conf} scriptSrc="src/lib/components/tinymce/tinymce.min.js" bind:value />
  <textarea name="additional_information" bind:value hidden />
</main>
