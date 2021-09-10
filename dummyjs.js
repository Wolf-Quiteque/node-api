for (let index = 0; index < negocios.length; index++) {
  matches.map((match) => {
    //--------------------------get bid list---------------------------------------------------------------------

    const { _id, id_cliente, cotacao, quantidade_total, codigo_de_negociacao } =
      match;

    if (match.lado_de_ordem == "bid") {
      Bidside.push({
        _id,
        id_cliente,
        cotacao,
        quantidade_total,
        codigo_de_negociacao,
      });
    }

    //--------------------------get ask list---------------------------------------------------------------------
    if (match.lado_de_ordem == "ask") {
      Askside.push({
        _id,
        id_cliente,
        cotacao,
        quantidade_total,
        codigo_de_negociacao,
      });
    }

    //--------------------------get matching list---------------------------------------------------------------------
    if (match.codigo_de_negociacao == negocios[index].codigo_de_negociacao) {
      matchList.push({
        _id,
        id_cliente,
        cotacao,
        quantidade_total,
        codigo_de_negociacao,
      });
    }

    for (let indexBid = 0; indexBid < Bidside.length; indexBid++) {
      for (let indexAsk = 0; indexAsk < Askside.length; indexAsk++) {
        if (
          Bidside[indexBid].codigo_de_negociacao ===
          Askside[indexAsk].codigo_de_negociacao
        ) {
          if (
            Bidside[indexBid].quantidade_total >=
            Askside[indexAsk].quantidade_total
          ) {
            bid_total =
              parseInt(Bidside[indexBid].quantidade_total) -
              parseInt(Askside[indexAsk].quantidade_total);

            Bidside[indexBid].quantidade_total = bid_total;
            Askside[indexAsk].quantidade_total = ask_total;
          } else {
            ask_total =
              parseInt(Askside[indexAsk].quantidade_total) -
              parseInt(Bidside[indexBid].quantidade_total);

            Bidside[indexBid].quantidade_total = 0;
            Askside[indexAsk].quantidade_total = ask_total;
          }
        }
      }
    }
  });
  // console.log(Askside);
  matchList = [];
  Bidside = [];
  Askside = [];
  bid_total = 0;
  ask_total = 0;
}
