/*<![CDATA[*/
(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'kpycef-cw.myshopify.com',
      storefrontAccessToken: 'ff5b30188b06d86c50bc24d3c021901b',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: '8662728474755',
        node: document.getElementById('product-component-1753483051833'),
        moneyFormat: '₺%7B%7Bamount%7D%7D',
        options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0",
          "margin-bottom": "0"
        },
        "text-align": "left"
      },
      "button": {
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px",
        "padding-left": "32px",
        "padding-right": "32px",
        "color": "#FFFFFF",
        "background-color": "#003B73",
        "border": "none",
        "border-radius": "8px",
        "text-transform": "uppercase",
        "letter-spacing": "0.5px",
        ":hover": {
          "background-color": "#F2553A",
          "color": "#FFFFFF"
        },
        ":focus": {
          "background-color": "#F2553A"
        }
      },
      "quantityInput": {
        "font-size": "16px",
        "padding-top": "12px",
        "padding-bottom": "12px",
        "font-family": "Inter, sans-serif",
        "font-weight": "500"
      },
      "price": {
        "font-family": "Inter, sans-serif",
        "font-weight": "300",
        "font-size": "28px",
        "color": "#F2553A"
      },
      "compareAt": {
        "font-family": "Inter, sans-serif",
        "font-weight": "300",
        "font-size": "20px",
        "color": "#6B7280"
      },
      "unitPrice": {
        "font-family": "Inter, sans-serif",
        "font-weight": "300",
        "font-size": "16px",
        "color": "#6B7280"
      }
    },
    "buttonDestination": "checkout",
    "contents": {
      "img": false,
      "button": true,
      "buttonWithQuantity": false,
      "title": false,
      "price": false,
      "options": true
    },
    "text": {
      "button": "SATIN AL",
      "outOfStock": "Stokta Yok",
      "unavailable": "Mevcut Değil"
    }
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "padding-top": "16px",
        "padding-bottom": "16px",
        "color": "#FFFFFF",
        "background-color": "#003B73",
        "border": "none",
        "border-radius": "8px",
        ":hover": {
          "background-color": "#F2553A",
          "color": "#FFFFFF"
        },
        ":focus": {
          "background-color": "#F2553A"
        }
      },
      "title": {
        "font-family": "Cormorant Garamond, serif",
        "font-weight": "400",
        "font-size": "26px",
        "color": "#003B73"
      }
    },
    "text": {
      "button": "Sepete Ekle"
    }
  },
  "option": {
    "styles": {
      "label": {
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "color": "#003B73"
      },
      "select": {
        "font-family": "Inter, sans-serif",
        "font-weight": "400",
        "color": "#003B73"
      }
    }
  },
  "cart": {
    "styles": {
      "button": {
        "font-family": "Inter, sans-serif",
        "font-weight": "600",
        "color": "#FFFFFF",
        "background-color": "#003B73",
        "border-radius": "8px",
        ":hover": {
          "background-color": "#F2553A",
          "color": "#FFFFFF"
        },
        ":focus": {
          "background-color": "#F2553A"
        }
      },
      "title": {
        "color": "#003B73"
      },
      "header": {
        "color": "#003B73"
      },
      "lineItems": {
        "color": "#003B73"
      },
      "subtotalText": {
        "color": "#003B73"
      },
      "subtotal": {
        "color": "#003B73"
      },
      "notice": {
        "color": "#003B73"
      },
      "currency": {
        "color": "#003B73"
      },
      "close": {
        "color": "#003B73",
        ":hover": {
          "color": "#F2553A"
        }
      },
      "empty": {
        "color": "#003B73"
      },
      "noteDescription": {
        "color": "#003B73"
      },
      "discountText": {
        "color": "#003B73"
      },
      "discountIcon": {
        "fill": "#003B73"
      },
      "discountAmount": {
        "color": "#003B73"
      }
    },
    "text": {
      "total": "Toplam",
      "button": "Ödemeye Geç",
      "noteDescription": "Sipariş notu",
      "discount": "İndirim kodu",
      "edit": "Düzenle",
      "checkout": "Ödeme",
      "free": "ÜCRETSİZ",
      "shipping": "Kargo",
      "subtotal": "Ara toplam"
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "font-family": "Inter, sans-serif",
        "background-color": "#003B73",
        ":hover": {
          "background-color": "#F2553A"
        },
        ":focus": {
          "background-color": "#F2553A"
        }
      },
      "count": {
        "font-size": "16px",
        "color": "#FFFFFF"
      }
    }
  },
  "lineItem": {
    "styles": {
      "variantTitle": {
        "color": "#003B73"
      },
      "title": {
        "color": "#003B73"
      },
      "price": {
        "color": "#003B73"
      },
      "fullPrice": {
        "color": "#003B73"
      },
      "discount": {
        "color": "#003B73"
      },
      "discountIcon": {
        "fill": "#003B73"
      },
      "quantity": {
        "color": "#003B73"
      },
      "quantityIncrement": {
        "color": "#003B73",
        "border-color": "#003B73"
      },
      "quantityDecrement": {
        "color": "#003B73",
        "border-color": "#003B73"
      },
      "quantityInput": {
        "color": "#003B73",
        "border-color": "#003B73"
      }
    }
  }
},
      });
    });
  }
})();
/*]]>*/