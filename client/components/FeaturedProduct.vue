<template>
  <div class="mainContent">
    <div class="unified_widget pageBanner my-5">
      <h1>Comic Books</h1>

      <p>
        <b>
          Browse for more Manga
          <a href="#">JoJo no Kimyou na Bouken</a>, or
          <a href="#">Comic Books</a> like DC Comics or Marvel Comics
          <a href="#">Best Comic books of the year so far</a>
        </b>
      </p>
    </div>

    <div class="bx-root">
      <div class="row">
        <div class="col-sm-5 text-center">
          <div class="bx-root-image cover-product">
            <img
              src="https://cdn.animenewsnetwork.com/hotlink/thumbnails/max700x700/cms/news/102888/one-piece-zou-visual.jpeg"
              class="img-fluid"
            />
          </div>
        </div>

        <div class="col-sm-7 m-auto">
          <div class="bx-root-dtls">
            <div class="bx-root-heading">One Piece</div>
          </div>

          <div class="bx-root-subtext">
            Gol D. Roger, a man referred to as the "Pirate King," is set to be executed by the World Government.
             But just before his demise, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line.
             Announcing that One Piece can be claimed by anyone worthy enough to reach it, the Pirate King is executed and the Great Age of Pirates begins.
          </div>
          <div class="bx-root-link">
            <span>Order Now</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
.cover-product img {
  float: left;
  border-radius: 5px;
  background: #ccc;
  margin: 10px;
}
.bx-root {
  border-radius: 5px;
  padding: 0 !important;
  background: #edf2f7;
}
.bx-root-heading {
  font-size: 40px;
  margin-bottom: 25px;
}
.bx-root-subtext {
  font-size: 20px;
  font-weight: 400;
  margin-left: 5px;
  margin-bottom: 15px;
}
.bx-root-link {
  margin-left: 5px;
  padding: 10px 20px;
  background-color: #ffbf58;
  border-radius: 5px;
  display: inline-block;
}
</style>