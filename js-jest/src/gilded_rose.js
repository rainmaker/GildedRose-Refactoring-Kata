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

  decrementQuality() {
    if (this.quality > 0) {
      this.quality -= 1
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

      item.sellIn = this.items[i].sellIn - 1;

      if (item.name == 'Aged Brie') {
        item.incrementQuality();
        if (item.sellIn < 0) {
          item.incrementQuality();
        }
      } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        item.incrementQuality();
        if (item.sellIn < 11) {
          item.incrementQuality();
        }
        if (item.sellIn < 6) {
          item.incrementQuality();
        }
        if (item.sellIn < 0) {
          item.quality = 0
        }
      } else {
        item.decrementQuality();
        if (item.sellIn < 0) {
          item.decrementQuality();
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
