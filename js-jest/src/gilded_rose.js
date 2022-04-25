class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  incrementQuality(item) {
    if (item.quality < 50) {
      item.quality += 1
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
        continue;
      }

      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          this.items[i].quality = this.items[i].quality - 1;
        }
      } else {
        this.incrementQuality(this.items[i]);
        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].sellIn < 11) {
            this.incrementQuality(this.items[i]);
          }
          if (this.items[i].sellIn < 6) {
            this.incrementQuality(this.items[i]);
          }
        }
      }

      this.items[i].sellIn = this.items[i].sellIn - 1;
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              this.items[i].quality = this.items[i].quality - 1;
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          this.incrementQuality(this.items[i]);
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
