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

      item.sellIn = item.sellIn - 1;

      if (item.name == 'Aged Brie') {
        this.updateAgedBrie(item);
      } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateBackstagePass(item);
      } else if (item.name.includes("Conjured") ) {
        this.updateConjuredItem(item);
      } else {
        this.updateRegularItem(item);
      }
    }

    return this.items;
  }

  updateAgedBrie(item) {
    item.incrementQuality();
    if (item.sellIn < 0) {
      item.incrementQuality();
    }
  }

  updateBackstagePass(item) {
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
  }

  updateRegularItem(item) {
    item.decrementQuality();
    if (item.sellIn < 0) {
      item.decrementQuality();
    }
  }

  updateConjuredItem(item) {
    this.updateRegularItem(item);
    this.updateRegularItem(item);
  }
}

module.exports = {
  Item,
  Shop
}
