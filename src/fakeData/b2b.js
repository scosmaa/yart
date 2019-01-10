var data = [
    {
        static: true,
        width: "33%",
        columns: [
            {
                code: "name",
                mandatory: true,
                fieldName: "name",
                isNum: false,
                isTitleColumn: true,
                isOrderedColumn: true,
                width: '42%',
                textAlign: 'left',
                title: nlsTableSettings.title_upper,
                shortTitle: '',
                functionParsingData: TableSettings.standardNameFunction
            },
            {
                code: "variation",
                fieldName: "variation",
                width: '15%',
                title: nlsTableSettings.varperc_upper,
                shortTitle: nlsTableSettings.varperc_short,
                functionParsingData: function (val, element, headerOptions) {
                    var tmp = (element.asset === 'X') ? dojoNumber.format(val, { pattern: '+#0.00000;-#0.00000' }) + ' %' : dojoNumber.format(val, { pattern: '+#0.00;-#0.00' }) + ' %';
                    var color = val > 0.00001 ? 'green' : val < -0.00001 ? 'red' : 'gray';
                    var relabsvariation = Math.max(Math.min(Math.abs(val) * 5.0, 50.0), 1.0);
                    var relVariation = // !element.relabsvariation ? '' :
                            '<div class="relVariation ' + color + '" style="width:' + relabsvariation + '%;"></div>';

                    //return '<p style="color:'+color+';">'+tmp+'</p>';
                    return '<div class="cellContent">' +
                        '<div class="centered">' +
                        '<div class="value" style="color:' + color + ';">' + tmp + '</div>' +
                        '<div class="name">' + headerOptions.shortTitle + '</div>' +
                        relVariation +
                        '</div>' +
                        '</div>';
                }
            },
            {
                code: "last",
                fieldName: "last",
                width: '26%',
                title: nlsTableSettings.price_upper,
                shortTitle: nlsTableSettings.pr_upper,
                functionParsingData: function (val, element, headerOptions) {
                    // price
                    var newVal;
                    if (Math.abs(val) >= 0.00001) {
                        if (element.curSymbol) {
                            newVal = (element.asset === 'X' ? dojoNumber.format(val, { pattern: (Math.abs(val) >= 10) ? '###0.00000' : '0.00000' }) : dojoNumber.format(val, { pattern: (Math.abs(val) >= 10) ? '###0.000' : '0.000#' })) + '</span><span class="cur">&nbsp;' + element.curSymbol + '</span>';
                        }
                        else {
                            newVal = (element.asset === 'X' ? dojoNumber.format(val, { pattern: (Math.abs(val) >= 10) ? '###0.00000' : '0.00000' }) : dojoNumber.format(val, { pattern: (Math.abs(val) >= 10) ? '###0.000' : '0.000#' }));
                        }
                    }
                    else
                        newVal = ' ';

                    if (headerOptions && headerOptions.shortTitle) {
                        return '<div class="cellContent">' +
                            '<div class="centered">' +
                            '<div class="value">' + newVal + '</div>' +
                            '<div class="name">' + headerOptions.shortTitle + '</div>' +
                            '</div>' +
                            '</div>';
                    }
                    else {
                        return newVal;
                    }
                }
            },
            {
                code: "lastpricelastupdate",
                fieldName: "lastpricelastupdate",
                width: '17%',
                title: nlsTableSettings.prtd_upper,
                shortTitle: nlsTableSettings.prtd,
                hideDetached: true,
                functionParsingData: TableSettings.standardTimestampFunction
            }
        ]
    },
    {
        static: false,
        width: "58%",
        pages: 4,
        columns: [

            // page 1
            {
                code: "bidsize",
                fieldName: "bidsize",
                width: '12%',
                title: nlsTableSettings.bidsz_upper,
                shortTitle: nlsTableSettings.bidsz,
                hideDetached: true
            },
            {
                code: "bid",
                fieldName: "bid",
                width: '12%',
                title: nlsTableSettings.bid_upper,
                shortTitle: nlsTableSettings.bid,
                hideDetached: true,
                functionParsingData: TableSettings.standardFunction
            },
            {
                code: "ask",
                fieldName: "ask",
                width: '12%',
                title: nlsTableSettings.ask_upper,
                shortTitle: nlsTableSettings.ask,
                hideDetached: true,
                functionParsingData: TableSettings.standardFunction
            },
            {
                code: "asksize",
                fieldName: "asksize",
                width: '12%',
                title: nlsTableSettings.asksz_upper,
                shortTitle: nlsTableSettings.asksz,
                hideDetached: true
            },
            {
                code: "min",
                fieldName: "min",
                width: '10%',
                title: nlsTableSettings.min_upper,
                shortTitle: nlsTableSettings.min_,
                hideDetached: true,
                functionParsingData: TableSettings.standardFunction
            },
            {
                code: "max",
                fieldName: "max",
                width: '10%',
                title: nlsTableSettings.max_upper,
                shortTitle: nlsTableSettings.max_,
                hideDetached: true,
                functionParsingData: TableSettings.standardFunction
            },
            {
                code: "openprice",
                fieldName: "openprice",
                width: '10%',
                title: nlsTableSettings.open_upper,
                shortTitle: nlsTableSettings.open_,
                hideDetached: true,
                functionParsingData: TableSettings.standardFunction
            },                    
            {
                code: "volume",
                fieldName: "volume",
                width: '12%',
                title: nlsTableSettings.totvol_upper,
                shortTitle: nlsTableSettings.totvol,
                hideDetached: true
            },
            {
                code: "datascadenza",
                fieldName: "datascadenza",
                textAlign: 'left',
                width: '10%',
                title: nlsTableSettings.expirydate_upper,
                shortTitle: '',
                hideDetached: true,
                functionParsingData: function (val, element, headerOptions) {
                    var obj = date.convertDateToObject(val),
                        st = ((headerOptions) && (headerOptions.shortTitle)) ? headerOptions.shortTitle : '',
                        txt = (val > 0) ? obj.formattedDate : " - - ";

                    return '<div class="cellContent">' +
                        '<div class="centered">' +
                        '<div class="value">' + txt + '</div>' +
                        '<div class="name">' + st + '</div>' +
                        '</div>' +
                        '</div>';
                }
            },

            // page 2 // "Skipper" data
            {
                code: "previousRefPrice",
                fieldName: "previousRefPrice",
                width: '20%',
                title: nlsTableSettings.prp_upper,
                shortTitle: nlsTableSettings.prp_short,
                hideDetached: true,
                functionParsingData: TableSettings.standardFunction
            },
            {
                code: "yieldgross",
                fieldName: "yieldgross",
                width: '20%',
                title: nlsTableSettings.grossyield_upper,
                shortTitle: "",
                hideDetached: true
            },
            {
                code: "yieldnet",
                fieldName: "yieldnet",
                width: '20%',
                title: nlsTableSettings.netyield_upper,
                shortTitle: "",
                hideDetached: true
            },
            {
                code: "durationgross",
                fieldName: "durationgross",
                width: '20%',
                title: nlsTableSettings.grossduration_upper,
                shortTitle: "",
                hideDetached: true
            },
            {
                code: "emittente",
                fieldName: "emittente",
                width: '20%',
                title: nlsTableSettings.issuer_upper,
                shortTitle: '',
                hideDetached: true
            },
            /*
            {
                code: "ratingsp",
                fieldName: "ratingsp",
                width: '20%',
                title: nlsTableSettings.sptarrating_upper,
                shortTitle: "",
                hideDetached: true
            },
            */

            // page 3
            {
                code: "returnprice1w",
                fieldName: "returnprice1w",
                width: '16.66%',
                title: nlsTableSettings.retpr1w_upper,
                shortTitle: nlsTableSettings.retpr1w_short,
                hideDetached: true
            },
            {
                code: "returnprice1m",
                fieldName: "returnprice1m",
                width: '16.66%',
                title: nlsTableSettings.retpr1m_upper,
                shortTitle: nlsTableSettings.retpr1m_short,
                hideDetached: true
            },
            {
                code: "returnprice3m",
                fieldName: "returnprice3m",
                width: '16.66%',
                title: nlsTableSettings.retpr3m_upper,
                shortTitle: nlsTableSettings.retpr3m_short,
                hideDetached: true
            },
            {
                code: "returnprice6m",
                fieldName: "returnprice6m",
                width: '16.66%',
                title: nlsTableSettings.retpr6m_upper,
                shortTitle: nlsTableSettings.retpr6m_short,
                hideDetached: true
            },
            {
                code: "returnprice1y",
                fieldName: "returnprice1y",
                width: '16.66%',
                title: nlsTableSettings.retpr1y_upper,
                shortTitle: nlsTableSettings.retpr1y_short,
                hideDetached: true
            },
            {
                code: "returnpriceytd",
                fieldName: "returnpriceytd",
                width: '16.66%',
                title: nlsTableSettings.retprytd_upper,
                shortTitle: nlsTableSettings.retprytd_short,                        
                hideDetached: true
            },

            // page 4                    
            {
                code: "paese",
                fieldName: "paese",
                width: '25%',
                title: nlsTableSettings.country_upper,
                shortTitle: nlsTableSettings.country,
                hideDetached: true
            },
            {
                code: "tipologia",
                fieldName: "tipologia",
                textAlign: 'left',
                width: '25%',
                title: nlsTableSettings.typology_upper,
                shortTitle: '',
                hideDetached: true
            },
            {
                code: "quotaminimainvest",
                fieldName: "quotaminimainvest",
                width: '25%',
                title: nlsTableSettings.mininv_upper,
                shortTitle: '',
                hideDetached: true
            },
            
            {
                code: "quantitamaxinseribile",
                fieldName: "quantitamaxinseribile",
                width: '25%',
                title: nlsTableSettings.maxquantity_upper,
                shortTitle: '',
                hideDetached: true
            }
        ]
    },
    {
        static: true,
        width: "9%",
        columns: [                    
            {
                mandatory: true,
                code: "addToCalc",
                fieldName: "addToCalc",
                width: '30%',
                title: "&nbsp;",
                shortTitle: '',
                optHeaderClass: 'noSortableCol',
                hideDetached: true,
                functionParsingData: function (val, element, headerOptions) {
                    if (element.isbondincalculator) {
                        return '&nbsp;';
                    }
                    var node = domConstruct.toDom('<button class="bondCalc_add" title="' + nlsTableSettings.addbondtocalc + '"></button>');

                    node.onclick = function (e) {
                        e.stopPropagation();
                        var _postData = {
                            data: {
                                code: element.isin,
                                accountid: sessionStorage.loggedUserID,
                                date: 0,
                                price: null,
                                yieldgross: null,
                                yieldnet: null,
                                duration: null,
                                expiry: element.datascadenza,
                                isin: element.identifier
                            }
                        };

                        xhr.post(
                            config.root + 'bond/calculator/Add',
                            {
                                handleAs: "json",
                                preventCache: false,
                                data: JSON.stringify(_postData),
                                headers: { 'Content-Type': 'application/json' }
                            }).then(lang.hitch(this,
                                function (data) {
                                    if (data.status === "ok") {
                                        if (typeof this.remove === "function") {
                                            this.remove();
                                        }
                                        // else if (typeof this.removeNode === "function") {
                                        //     this.removeNode();
                                        // }
                                        else
                                            this.style.display = "none";
                                    }
                                }.bind(this)),
                            function (err) { console.error(err) }
                            );
                    };
                    return node;
                }
            },
            {
                mandatory: true,
                code: "isin",
                fieldName: "isin",
                width: '20%',
                title: "+",
                shortTitle: '+',
                optHeaderClass: 'noSortableCol',
                optStyle: 'overflow: visible;',
                hideDetached: true,
                addWlMnuLocal: true,
                functionParsingData: function (val, element, headerOptions) {
                    return '<div class="cellContent">' +
                        '<div class="centered">' +
                        '<div class="wl_add" data-wlcode="' + val + '"></div>' +
                        '</div>' +
                        '</div>';
                }
            },
            {
                code: "pdf",
                fieldName: "pdf",
                mandatory: true,
                width: '30%',
                title: "&nbsp;",
                shortTitle: '&nbsp;',
                optHeaderClass: 'noSortableCol',
                hideDetached: true,
                // functionParsingData: function (val, element, headerOptions) {
                //     var wrapper = domConstruct.toDom('<div class="bondCalc_pdfContainer"></div>'),
                //         pdfNode = domConstruct.place('<div></div>', wrapper),
                //         button = domConstruct.place(
                //             '<button class="bondCalc_pdf" title="' + nlsTableSettings.msgpdfopen + '">PDF</button>',
                //             wrapper),
                //         widget = new DocumentsPDFBonds({}, pdfNode);

                //     button.onclick = function (e) {
                //         widget.show(element.code, element.isin, element.name);
                //         widget._expandButtonClick(e);
                //     };

                //     return wrapper;
                // }
                functionParsingData: function (val, element, headerOptions) {
                    var wrapper = domConstruct.toDom('<div class="bondCalc_pdfContainer"></div>'),
                        button = domConstruct.place(
                            '<button class="bondCalc_pdf" title="' + nlsTableSettings.msgpdfopen + '">PDF</button>',
                            wrapper);

                    button.onclick = function (e) {
                        e.stopPropagation();
                        var node = domConstruct.create('div', { 'class': "externalcontents-frame report_fullscreen_container" }, document.body); // app.domNode
                        var widget = new DocumentsPDFBondsSlider({
                            "fullscreen_animation": true,
                            "code": element.code,
                            "isin": element.identifier,
                            "name": element.name 
                        }, node);
                        widget.show(element.identifier, element.code, element.name);
                    };

                    return wrapper;
                }
                // functionParsingData: function (val, element, headerOptions) {
                //     var node;
                //     if (/SAL_REPORT/.test(sessionStorage.specialEnablements)) {
                //         node = domConstruct.toDom('<div class="cellContent report" title="' + nlsTableSettings.openreport + '" data-name="' + element.name + '" data-mssecurityid="' + val + '" data-currency="' + element.curSymbol + '">' +
                //             '<div class="centered">' +
                //             '<span class="fa fa-file-text"></span>' +
                //             '</div>' +
                //             '</div>');
                //     } else {
                //         node = domConstruct.toDom('<div class="cellContent report" title="' + nlsTableSettings.openreport + '" data-name="' + element.name + '" data-mscode="' + element.identifier + '" data-currency="' + element.curSymbol + '">' +
                //             '<div class="centered">' +
                //             '<span class="fa fa-file-text"></span>' +
                //             '</div>' +
                //             '</div>');
                //     }
                //     node.onclick = function (e) {
                //         e.stopPropagation();

                //         var showButton = element && element.code && element.isin && element.name;
                //         var node = domConstruct.create('div', { 'class': "externalcontents-frame report_fullscreen_container" }, document.body); // app.domNode
                //         var widget = new DocumentsPDFBondsSlider({
                //             "fullscreen_animation": true,
                //             "code": element.code,
                //             "isin": element.isin,
                //             "name": element.name 
                //         }, node);
                //         if (showButton) {
                //             widget.show();
                //     }
                //     return node;
            },
            {
                code: "tradingIcon",
                mandatory: true,
                fieldName: "identifier",
                width: '20%',
                title: "",
                shortTitle: '',
                isNum: false,
                optHeaderClass: 'noSortableCol fa',
                optHeaderStyle: 'vertical-align:middle;font-size:smaller;',
                hideDetached: true,
                addWlMnuLocal: false,
                isTradingColumn: true,
                functionParsingData: function (val, element, headerOptions) {
                    var node = domConstruct.toDom('<div class="cellContent"><div class="centered"><span class="fa fa-external-link-square"></span></div></div>');

                    node.onclick = function (e) {
                        e.stopPropagation();
                        var app = dijit.byId('app');
                        if (app && app.tableContainer) {
                            //app.tableContainer.enableTradingMode(true, { data: element });
                            app.tableContainer.alphabet.switchTableViewType('trading', element);

                            var row = e.currentTarget.parentNode;
                            while (row && !row.classList.contains('row')) {
                                row = row.parentNode;
                            }
                            setTimeout(function () {
                                app.tableContainer.table._scrollToRow(row, true);
                            }, 333);
                        }

                    };
                    return node;
                }
            }
        ]
    }
]
