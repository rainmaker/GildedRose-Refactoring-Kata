class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  incrementQuality() {
    if (this.quality < 50) {
      this.quality += 1
    }
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
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
        item.incrementQuality();
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sellIn < 11) {
            item.incrementQuality();
          }
          if (item.sellIn < 6) {
            item.incrementQuality();
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
          item.incrementQuality();
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
