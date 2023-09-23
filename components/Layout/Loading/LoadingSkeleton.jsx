"use client";
function LoadingSkeleton() {
  return (
    <>
      <div className="hero min-h-screen bg-base-100 flex items-center justify-center">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">Loading...</h1>
            <br /><br />
            <div className="flex justify-center">
              <img src="/assets/images/pre.svg" alt="Loading image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingSkeleton;
