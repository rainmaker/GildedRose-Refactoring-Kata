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

      let item = this.items[i];

      if (item.name == 'Sulfuras, Hand of Ragnaros') {
        continue;
      }

      if (item.name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          item.quality = this.items[i].quality - 1;
        }
      } else {
        this.incrementQuality(item);
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sellIn < 11) {
            this.incrementQuality(item);
          }
          if (item.sellIn < 6) {
            this.incrementQuality(item);
          }
        }
      }

      item.sellIn = this.items[i].sellIn - 1;
      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              item.quality = this.items[i].quality - 1;
            }
          } else {
            item.quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          this.incrementQuality(item);
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
