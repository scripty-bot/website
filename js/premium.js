function x() {
  const tierDetails = [
    {
      "p": 5,
      "f": [
        "Up to 10 users in a voice chat, up from default of 5",
        "Premium status can be applied to 1 server",
      ],
      "id": 66453,
    },
    {
      "p": 10,
      "f": [
        "Up to 25 users in a voice chat",
      ],
      "id": 54920,
    },
    {
      "p": 25,
      "f": [
        "Up to 50 users in a voice chat",
        "Premium status can be applied to 3 servers",
      ],
      "id": 54921,
    },
    {
      "p": 50,
      "f": [
        "Up to 75 users in a voice chat",
      ],
      "id": 54923,
    },
    {
      "p": 75,
      "f": [
        "Up to 100 users in a voice chat",
        "Premium status can be applied to 5 servers",
      ],
      "id": 54925,
    },
    {
      "p": 100,
      "f": [
        "All from $75 plus;",
        "Your own managed instance of Scripty for 1 server",
      ],
      "id": 54925,
    }
  ];

  window.sa_event = window.sa_event || function () {
    var a = [].slice.call(arguments);
    window.sa_event.q ? window.sa_event.q.push(a) : window.sa_event.q = [a];
  };
  const dntActive = parseInt(navigator.msDoNotTrack || window.doNotTrack || navigator.doNotTrack, 10) === 1;
  const tierListTable = document.getElementById("tier_list_table");
  const createElement = function (t) {return document.createElement(t)};
  const appendChild = function (self, child) {return self.appendChild(child)};
  const tableData = "td";

  for (const tier of tierDetails) {
    const tableRow = createElement("tr");

    const priceColumn = createElement(tableData);
    priceColumn.innerHTML = `$${tier["p"]}`;
    appendChild(tableRow, priceColumn);

    const featuresColumn = createElement(tableData);
    const featuresList = createElement("ul");
    for (const feature of tier["f"]) {
      const featureListElement = createElement("li");
      featureListElement.innerHTML = feature;
      appendChild(featuresList, featureListElement);
    }
    appendChild(featuresColumn, featuresList);
    appendChild(tableRow, featuresColumn);

    const subscribeColumn = createElement(tableData);
    const subscribeLink = createElement("a");
    subscribeLink.href = `https://github.com/sponsors/tazz4843/sponsorships?sponsor=tazz4843&tier_id=${tier["id"]}`;
    if (!dntActive) subscribeLink.addEventListener("click", function () {
      sa_event("sponsor_tier_clicked_" + tier["p"])
    });
    subscribeLink.className = "button is-light";
    subscribeLink.innerHTML = "Subscribe";
    appendChild(subscribeColumn, subscribeLink);
    appendChild(tableRow, subscribeColumn);

    appendChild(tierListTable, tableRow);
  };
};
x();
