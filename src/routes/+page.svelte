<script>
  import { HeroMain, HeroSupport } from '$lib/components';
  import { UndrawWomenFFRD } from '$lib/icons';
</script>

<div class="w-full">
  <HeroMain>
    <h3 slot="h3" class="font-medium text-3xl mb-3">Smart Product</h3>
    <h1 slot="h1" class="font-bold text-6xl mb-6">Summer Offer <br /> 2023 Collection</h1>
    <button slot="lead" class="btn btn-outline-dark btn-lg">Get Started</button>
    <UndrawWomenFFRD slot="image"/>
  </HeroMain>
  <HeroSupport />
  <!-- <HeroImageRight>
    <h1 slot="h1" class="font-mono text-2xl mb-3">Responsive left-aligned hero with image</h1>
    <p slot="lead" >
      Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most
      popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid
      system, extensive prebuilt components, and powerful JavaScript plugins.
    </p>
    <UndrawHero slot="image" style='max-height: 50vh;'/>
  </HeroImageRight>

  -->
  <!-- <HeroTextCenter
title={"center hero"}
lead={`Quickly design and customize responsive mobile-first sites with
      Bootstrap, the world’s most popular front-end open source toolkit,
      featuring Sass variables and mixins, responsive grid system,
      extensive prebuilt components, and powerful JavaScript plugins.`}
>
<button type='button' className='btn btn-warning btn-lg px-4 me-md-2'>
  Primary
</button>
</HeroTextCenter> -->
</div>
