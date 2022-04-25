const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should store an item", function(){
    const item = new Item("foo", 1, 1);
    const gildedRose = new Shop([item]);
    const items = gildedRose.updateQuality();

    expect(items[0]).toMatchObject(item);
  });

  describe("item", function() {
    it("should have a quality field", function() {
      const gildedRose = new Shop([new Item("foo", 10, 2)]);
      const items = gildedRose.updateQuality();

      expect(items[0]).toHaveProperty("quality");
    });

    it("should have a sellIn value", function() {
      const gildedRose = new Shop([new Item("foo", 10, 2)]);
      const items = gildedRose.updateQuality();

      expect(items[0]).toHaveProperty("sellIn");
    });

    it("should have a name", function() {
      const gildedRose = new Shop([new Item("foo", 10, 2)]);
      const items = gildedRose.updateQuality();

      expect(items[0]).toHaveProperty("name");
    });
  });

  describe("updateQuality", function() {
    it("should degrade in quality by 1 point per day", function(){
      const gildedRose = new Shop([new Item("hat", 10, 2)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(1);
    });

    it("should decrement the sellIn value", function(){
      const gildedRose = new Shop([new Item("hat", 10, 2)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
    });

    it("should degrade twice as fast once sellIn reaches 0", function(){
      const gildedRose = new Shop([new Item("hat", 0, 2)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
    });

    it("should never have a quality less than 0", function(){
      const gildedRose = new Shop([new Item("hat", 0, 0)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
    });

    describe("Conjured items", function(){
      it("should degrade twice as fast as regular items before sellIn reaches 0", function(){
        const gildedRose = new Shop([new Item("Conjured Hat", 3, 4)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(2);
      });

      it("should degrade twice as fast as regular items when sellIn reaches 0", function(){
        const gildedRose = new Shop([new Item("Conjured Hat", 0, 4)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(0);
      });
    });

    describe("Aged Brie", function(){
      it("should increase in value as it approaches the sell-by date", function(){
        const gildedRose = new Shop([new Item("Aged Brie", 3, 0)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(1);
      });

      it("should increase in value by 2 after it passes the sell-by date", function(){
        const gildedRose = new Shop([new Item("Aged Brie", -1, 0)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(2);
      });

      it("should never have a quality greater than 50", function(){
        const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(50);
      });
    });

    describe("Sulfuras, Hand of Ragnaros", function(){
      it("should never decreases in quality", function(){
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(80);
      });

      it("should never gets closer to a sell-by date", function(){
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).toBe(5);
      });

    });

    describe("Backstage passes", function(){
      it("should increase in value as it approaches the sell-by date", function(){
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 0)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(1);
      });

      it("should increase in value by 2 when there are <10 days till sell-by date", function(){
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(2);
      });

      it("should increase in value by 3 when there are <5 days till sell-by date", function(){
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(3);
      });

      it("should drop in value to 0 after the sell-by date", function(){
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(0);
      });

      it("should never have a quality greater than 50", function(){
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 14, 50),
          new Item("Backstage passes to a TAFKAL80ETC concert", 9, 49),
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(50);
        expect(items[1].quality).toBe(50);
        expect(items[2].quality).toBe(50);
      });

    });

    // it("conjured items should degrade in quality by 2 points per day", function(){
    //   const gildedRose = new Shop([new Item("conjured-hat", 10, 2)]);
    //   const items = gildedRose.updateQuality();

    //   expect(items[0].quality).toBe(0);
    // });

  });
});
