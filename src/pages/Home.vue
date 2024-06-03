<template>
<!--  <div class="container" >-->
<!--    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">-->
<!--      &lt;!&ndash; Indicators &ndash;&gt;-->
<!--      <ol class="carousel-indicators">-->
<!--        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>-->
<!--        <li data-target="#carousel-example-generic" data-slide-to="1"></li>-->
<!--        <li data-target="#carousel-example-generic" data-slide-to="2"></li>-->
<!--      </ol>-->

<!--      &lt;!&ndash; Wrapper for slides &ndash;&gt;-->
<!--      <div class="carousel-inner" role="listbox">-->
<!--        <div class="item active">-->
<!--          <img src="../../public/image/1111.webp" alt="...">-->
<!--          <div class="carousel-caption">-->
<!--            <h3>First slide label</h3>-->
<!--            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <img src="../../public/image/1111.webp" alt="...">-->
<!--          <div class="carousel-caption">-->
<!--            <h3>Second slide label</h3>-->
<!--            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>-->
<!--          </div>-->
<!--        </div>-->

<!--      </div>-->

<!--      &lt;!&ndash; Controls &ndash;&gt;-->
<!--      <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">-->
<!--        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>-->
<!--        <span class="sr-only">Previous</span>-->
<!--      </a>-->
<!--      <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">-->
<!--        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>-->
<!--        <span class="sr-only">Next</span>-->
<!--      </a>-->
<!--    </div>-->
<!--  </div>-->
  <br>
  <div class="jumbotron">

    <h1>Hello, Everybody!</h1>
    <p>
      welcome to my secret world.this place records my whole life,about my life , my work and my amusement.<br>

      so enjoy the game of life.
    </p>
    <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
  </div>
</template>
<script >

export default {
  name: 'Home',
  data() {
    return {
      data: {
        name: 'Home'
      }
    }
  },
  mounted() {
    // $('.carousel').carousel({
    //   interval: 5000
    // })
  }
}

</script>