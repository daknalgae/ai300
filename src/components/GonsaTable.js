import React, { useState, useEffect, useRef } from "react";
import { usePagination, useTable } from "react-table";
import { SAMPLE_GONGSA } from "./sampleGongsaData";

import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";

const statusColorMap = {
  0: "gray",
  1: "red",
  2: "green",
  // etc
};
const statusMap = {
  0: "미진행",
  1: "진행중",
  2: "진행완료",
  // etc
};

function Table({ columns, data }) {
  const [detailData, setDetailData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const mapElement = useRef(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: [
          "idx",
          "grade",
          "jisa",
          "sky",
          "damdang",
          "longitude",
          "distance",
          "degree",
          "latitude",
          "dangerous",
        ],
      },
    },
    usePagination
  );

  const rowClicked = (row) => {
    setIsModal(!isModal);
    // axios({
    //   method: "GET",
    //   url: "http://220.93.122.144:3000/ailine/detail?idx=" + row.idx,
    //   header: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTP-8",
    //   },
    //   responseType: "type",
    // })
    //   .then(function (response) {
    //     //console.log(response.data);
    //     setDetailData(response.data);
    //     console.log(detailData);
    //   })
    //   .catch((Error) => {
    //     console.log(Error);
    //   });

    const arr2 = SAMPLE_GONGSA.filter((element) => element.idx === row.idx);
    setDetailData(arr2);

    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  };

  const handleClick = () => {
    setIsModal(!isModal);
  };
  const active = isModal ? "is-active" : "";
  return (
    <>
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                onClick={() => rowClicked(row.original)}
              >
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
      <div
        className="pagination"
        style={{ padding: "0.5rem", justifyContent: "space-evenly" }}
      >
        <button
          className="button is-light"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          className="button is-light"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          className="button is-light"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          className="button is-light"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          페이지{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | 페이지로 가기 :{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}개 보기
            </option>
          ))}
        </select>
      </div>
      <div className={`modal ${active}`}>
        <div className="modal-background" />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">공사 상세정보</p>
            <button
              onClick={handleClick}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <div className="column">
              <div className="content is-small content-detail">
                {detailData != "" ? (
                  <>
                    <p>
                      <strong>공사개요&nbsp;&nbsp;&nbsp;</strong>
                      {detailData[0].gongsa}
                    </p>
                    <p>
                      <strong>중요순위&nbsp;&nbsp;&nbsp;</strong>
                      {detailData[0].rank}
                    </p>
                    <p>
                      <strong>주소&nbsp;&nbsp;&nbsp;</strong>
                      {detailData[0].site}
                    </p>
                    <p>
                      <strong>공사 등급&nbsp;&nbsp;&nbsp;</strong>
                      {detailData[0].grade}
                    </p>
                    <p>
                      <strong>지사&nbsp;&nbsp;&nbsp;</strong>
                      {detailData[0].jisa}
                    </p>
                    <p>
                      <strong>공사기간&nbsp;&nbsp;&nbsp;</strong>
                      {detailData[0].startday}~{detailData[0].endday}
                    </p>
                    <p>
                      <strong>공사장과의 거리&nbsp;&nbsp;&nbsp;</strong>
                      {detailData[0].distance}m
                    </p>
                    <p>
                      <strong>진행상태&nbsp;&nbsp;&nbsp;</strong>
                      {statusMap[detailData[0].status]}
                    </p>
                    <p>
                      <strong>위험도&nbsp;&nbsp;&nbsp;</strong>
                      {detailData[0].dangerous}
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="column">
              <div className="box">
                <div className="content">
                  <h3>지도</h3>
                </div>
                <div ref={mapElement} style={{ minHeight: "600px" }} />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button onClick={handleClick} className="button is-success">
              확인
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}

const GongsaTable = ({ date, jisa }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url:
    //     "http://220.93.122.144:3000/ailine/list?date=" + date + "&jisa=" + jisa,
    //   header: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTP-8",
    //   },
    //   responseType: "type",
    // })
    //   .then(function (response) {
    //     setData(response.data);
    //   })
    //   .catch((Error) => {
    //     console.log(Error);
    //   });
    setData(SAMPLE_GONGSA);
  }, [date, jisa]);

  const columns = React.useMemo(
    () => [
      {
        Header: "중요순위",
        accessor: "rank", // accessor is the "key" in the data
      },
      {
        Header: "공사개요",
        accessor: "gongsa",
      },
      {
        Header: "주소",
        accessor: "site",
      },
      {
        Header: "시작일시",
        accessor: "startday",
      },

      {
        Header: "dd",
        accessor: "damdang",
      },
      {
        Header: "진행상태",
        accessor: "dangerous",
      },
      {
        Header: "진행상태",
        accessor: "degree",
      },
      {
        Header: "진행상태",
        accessor: "distance",
      },
      {
        Header: "종료일시",
        accessor: "endday",
      },
      {
        Header: "진행상태",
        accessor: "status",
        Cell: (props) => {
          return (
            <p style={{ color: statusColorMap[props.value] }}>
              {statusMap[props.value]}
            </p>
          );
        },
      },
      {
        Header: "진행상태",
        accessor: "grade",
      },
      {
        Header: "진행상태",
        accessor: "idx",
      },
      {
        Header: "진행상태",
        accessor: "jisa",
      },
      {
        Header: "진행상태",
        accessor: "latitude",
      },
      {
        Header: "진행상태",
        accessor: "longitude",
      },
      {
        Header: "진행상태",
        accessor: "sky",
      },
    ],
    []
  );

  return (
    <div className="box">
      <div className="content">
        <h3>사외공사 순회점검 우선순위</h3>
      </div>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  );
};

export default GongsaTable;
